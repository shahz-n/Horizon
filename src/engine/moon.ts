import * as THREE from "three";
import workerController from "./worker.controller";
import textureWorkerUrl from "./texture.worker.ts?worker&url";

import { TextureLoader } from "three";

const isLargeScreen = window.innerWidth > 1024 || window.innerHeight > 1024;

const MOON_RADIUS = 6;
const GRID_SIZE = 4;
const TILE_COUNT = GRID_SIZE * GRID_SIZE;
const WORKER_COUNT = Math.min(4, navigator.hardwareConcurrency);
const SEGMENT_WIDTH = 1024;
const SEGMENT_HEIGHT = 1024;
const TILE_WIDTH = 4096;
const TILE_HEIGHT = 2048;

type TileTier = "4k" | "high";

const TILES = [
  [0, 1],
  [3, 4, 5, 7],
  [8, 9, 11, 12, 13, 15],
  [2, 6, 10, 14],
];

type WorkerChunk = {
  index: number;
  segment: number;
  bitmap: ImageBitmap;
};

type WorkerResponse = {
  index: number;
  chunks?: WorkerChunk[];
  error?: string;
};

class MoonManager {
  readonly mesh: THREE.Mesh;

  private readonly targetTier: "16k" | "8k";
  private readonly loadedTiers = new Array<TileTier | null>(TILE_COUNT).fill(
    null,
  );
  private texture!: THREE.Texture;
  private readonly workerController = workerController;
  private readonly bitmaps: {
    index: number;
    segment: number;
    bitmap: ImageBitmap | null;
  }[] = [];
  private tilePointer = 0;

  private readonly fetchWorker = {
    id: "fetchWorker",
    url: textureWorkerUrl,
  };

  createTiledSphereGeometry(segments: number): THREE.BufferGeometry {
    return new THREE.SphereGeometry(MOON_RADIUS, segments, segments);
  }
  private createDefaultTexture(): void {
    const texture = new THREE.Texture({
      width: 16384,
      height: 8192,
    });
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.source.dataReady = false;
    texture.needsUpdate = true;
    this.texture = texture;
  }

  constructor(scene: THREE.Scene) {
    this.targetTier = isLargeScreen ? "16k" : "8k";
    this.workerController.createPool(
      this.fetchWorker.id,
      new URL(this.fetchWorker.url, import.meta.url),
      WORKER_COUNT,
    );
    this.createDefaultTexture();
    this.mesh = new THREE.Mesh(
      this.createTiledSphereGeometry(isLargeScreen ? 128 : 64),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 1,
        metalness: 0,
        map: this.texture,
      }),
    );

    this.mesh.position.set(0, -17.5, -6);
    this.mesh.scale.setScalar(12);
    this.loadSlices();
    scene.add(this.mesh);
  }

  setPositionAndScale(pos: THREE.Vector3, scale: number): void {
    this.mesh.position.copy(pos);
    this.mesh.scale.setScalar(scale);
  }

  setRotation(rotX: number, rotY: number): void {
    this.mesh.rotation.set(rotX, rotY, this.mesh.rotation.z);
  }

  loadSlices(): void {
    void this.loadTexturePipeline();
  }

  private async loadTexturePipeline(): Promise<void> {
    const batches = [
      ...TILES.map((tiles) =>
        tiles.map((index) => ({ index, tier: "4k" as TileTier })),
      ),
      ...TILES.map((tiles) =>
        tiles.map((index) => ({ index, tier: "high" as TileTier })),
      ),
    ];

    for (const batch of batches) {
      let nextIndex = 0;

      const loadNext = async (): Promise<void> => {
        const job = batch[nextIndex++];

        if (!job) return;

        await this.loadTile(job.index, job.tier);
        await loadNext();
      };

      await Promise.all(
        Array.from({ length: Math.min(WORKER_COUNT, batch.length) }, loadNext),
      );
    }

    this.workerController.destroyPool(this.fetchWorker.id);
  }
  private async loadTile(index: number, tier: TileTier): Promise<void> {
    return new Promise((resolve) => {
      const worker = this.workerController.acquireWorker(this.fetchWorker.id);

      if (!worker) {
        resolve();
        return;
      }

      const folder = tier === "4k" ? "4k" : this.targetTier;
      const url = `/moon/${folder}/${String(index).padStart(2, "0")}.jpg`;

      const finish = () => {
        this.workerController.releaseWorker(this.fetchWorker.id, worker);
        resolve();
      };

      worker.onmessage = ({ data }: MessageEvent<WorkerResponse>) => {
        if (data.error || !data.chunks) {
          console.warn(`[moon] Tile ${data.index} failed:`, data.error);
          finish();
          return;
        }

        this.onTileLoaded(data.index, tier, data.chunks);
        finish();
      };

      worker.onerror = finish;

      worker.postMessage({
        index,
        url,
        priority: tier === "4k" ? "high" : "auto",
      });
    });
  }

  private async onTileLoaded(
    index: number,
    tier: TileTier,
    chunks: WorkerChunk[],
  ): Promise<void> {
    if (tier === "4k" && this.loadedTiers[index] === "high") {
      for (const chunk of chunks) {
        chunk.bitmap.close();
      }

      return;
    }

    for (const chunk of chunks) {
      const existing = this.bitmaps.find(
        (bitmap) =>
          bitmap.index === chunk.index &&
          bitmap.segment === chunk.segment &&
          bitmap.bitmap !== null,
      );

      if (existing) {
        existing.bitmap?.close();
        existing.bitmap = chunk.bitmap;
      } else {
        this.bitmaps.push({
          index: chunk.index,
          segment: chunk.segment,
          bitmap: chunk.bitmap,
        });
      }
    }
    this.loadedTiers[index] = tier;
  }

  async uploadNextSegment(renderer: THREE.WebGLRenderer): Promise<void> {
    if (this.tilePointer > this.bitmaps.length - 1) return;

    const texture = this.texture;

    const gl = renderer.getContext();

    const properties = renderer.properties.get(texture) as {
      __webglTexture?: WebGLTexture;
    };

    const webglTexture = properties.__webglTexture;
    if (!webglTexture) return;

    const item = this.bitmaps[this.tilePointer];

    if (!item) return;

    const { index, segment, bitmap } = item;

    if (!bitmap) return;

    const segmentX = segment % 4;
    const segmentY = Math.floor(segment / 4);

    const tileX = (index % GRID_SIZE) * TILE_WIDTH;
    const tileY = (GRID_SIZE - 1 - Math.floor(index / GRID_SIZE)) * TILE_HEIGHT;

    const x = tileX + segmentX * SEGMENT_WIDTH;
    const y = tileY + (1 - segmentY) * SEGMENT_HEIGHT;

    this.bitmaps[this.tilePointer].bitmap = null;

    gl.bindTexture(gl.TEXTURE_2D, webglTexture);

    renderer.state.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    renderer.state.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    renderer.state.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, gl.NONE);
    renderer.state.pixelStorei(gl.UNPACK_ALIGNMENT, 4);

    gl.texSubImage2D(gl.TEXTURE_2D, 0, x, y, gl.RGBA, gl.UNSIGNED_BYTE, bitmap);
    console.log(segment, index);
    if (
      this.tilePointer === this.bitmaps.length - 1 ||
      this.tilePointer % 32 == 0
    ) {
      gl.generateMipmap(gl.TEXTURE_2D);
    }
    bitmap.close();

    this.tilePointer++;
  }
}

let moonInstance: MoonManager | null = null;

export function createMoon(scene: THREE.Scene) {
  return (moonInstance ??= new MoonManager(scene));
}
