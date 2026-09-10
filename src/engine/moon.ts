import * as THREE from "three";
import workerController from "./worker.controller";

const isLargeScreen = window.innerWidth > 1024 || window.innerHeight > 1024;

const MOON_RADIUS = 6;
const GRID_SIZE = 4;
const TILE_COUNT = GRID_SIZE * GRID_SIZE;
const WORKER_COUNT = Math.min(3, navigator.hardwareConcurrency);
const SEGMENT_WIDTH = 1024;
const SEGMENT_HEIGHT = 1024;

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
  private readonly materials: THREE.MeshStandardMaterial[] = [];
  private readonly workerController = workerController;
  private readonly bitmaps: {
    index: number;
    segment: number;
    bitmap: ImageBitmap | null;
  }[] = [];
  private tilePointer = 0;

  private readonly fetchWorker = {
    id: "fetchWorker",
    url: new URL("./texture.worker.ts", import.meta.url),
  };

  createTiledSphereGeometry(segments: number): THREE.BufferGeometry {
    console.log("createTiledSphereGeometry start", performance.now());
    const geometry = new THREE.SphereGeometry(MOON_RADIUS, segments, segments);

    const index = geometry.getIndex();
    const uv = geometry.getAttribute("uv");

    if (!index || !uv) {
      throw new Error("Sphere geometry is missing index or uv attributes");
    }

    const tileIndices: number[][] = Array.from(
      { length: TILE_COUNT },
      () => [],
    );

    for (let i = 0; i < index.count; i += 3) {
      const vertices = [index.getX(i), index.getX(i + 1), index.getX(i + 2)];
      const us = vertices.map((vertex) => uv.getX(vertex));

      if (Math.max(...us) - Math.min(...us) > 0.5) {
        for (let i = 0; i < us.length; i++) {
          if (us[i] < 0.5) us[i] += 1;
        }
      }

      const u = ((us[0] + us[1] + us[2]) / 3) % 1;
      const v =
        (uv.getY(vertices[0]) + uv.getY(vertices[1]) + uv.getY(vertices[2])) /
        3;

      const col = Math.min(GRID_SIZE - 1, Math.floor(u * GRID_SIZE));
      const row = Math.min(GRID_SIZE - 1, Math.floor((1 - v) * GRID_SIZE));

      tileIndices[row * GRID_SIZE + col].push(...vertices);
    }

    const reorderedIndices: number[] = [];

    geometry.clearGroups();

    for (let tile = 0; tile < TILE_COUNT; tile++) {
      const indices = tileIndices[tile];

      geometry.addGroup(reorderedIndices.length, indices.length, tile);
      reorderedIndices.push(...indices);
    }

    geometry.setIndex(reorderedIndices);

    console.log("createTiledSphereGeometry end", performance.now());
    return geometry;
  }

  private createDefaultTextureMaps(): void {
    console.log("createDefaultTextureMaps start", performance.now());
    for (let index = 0; index < TILE_COUNT; index++) {
      const texture = new THREE.Texture({
        width: 4096,
        height: 2048,
      });

      texture.colorSpace = THREE.SRGBColorSpace;
      texture.generateMipmaps = false;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;

      const col = index % GRID_SIZE;
      const row = Math.floor(index / GRID_SIZE);

      texture.repeat.set(GRID_SIZE, GRID_SIZE);
      texture.offset.set(-col, row - (GRID_SIZE - 1));

      this.materials[index].map = texture;
      // this.materials[index].needsUpdate = true;
      texture.source.dataReady = false;
      texture.needsUpdate = true;
    }

    console.log("createDefaultTextureMaps end", performance.now());
  }

  constructor(scene: THREE.Scene) {
    this.targetTier = isLargeScreen ? "16k" : "8k";

    this.mesh = new THREE.Mesh(
      this.createTiledSphereGeometry(isLargeScreen ? 128 : 64),
      Array.from({ length: TILE_COUNT }, () => {
        return new THREE.MeshStandardMaterial({
          color: 0xffffff,
          roughness: 1,
          metalness: 0,
        });
      }),
    );
    console.log("creating pool", performance.now());
    this.workerController.createPool(
      this.fetchWorker.id,
      this.fetchWorker.url,
      WORKER_COUNT,
    );
    console.log("creating pool end", performance.now());
    this.materials.push(
      ...(this.mesh.material as THREE.MeshStandardMaterial[]),
    );

    this.createDefaultTextureMaps();

    this.mesh.position.set(0, -17.5, -6);
    this.mesh.scale.setScalar(12);

    scene.add(this.mesh);

    this.loadSlices();
  }

  setPositionAndScale(pos: THREE.Vector3, scale: number): void {
    // console.log("setPositionAndScale start", performance.now());
    this.mesh.position.copy(pos);
    this.mesh.scale.setScalar(scale);
    // console.log("setPositionAndScale end", performance.now());
  }

  setRotation(rotX: number, rotY: number): void {
    // console.log("setRotation start", performance.now());
    this.mesh.rotation.set(rotX, rotY, this.mesh.rotation.z);
    // console.log("setRotation end", performance.now());
  }

  loadSlices(): void {
    console.log("loadSlices start", performance.now());
    void this.loadTexturePipeline();
    console.log("loadSlices end", performance.now());
  }

  private async loadTexturePipeline(): Promise<void> {
    const jobs = [
      ...TILES[0].map((index) => ({ index, tier: "4k" as TileTier })),
      ...TILES.flat().map((index) => ({ index, tier: "high" as TileTier })),
    ];

    let nextIndex = 0;

    const loadNext = async (): Promise<void> => {
      const job = jobs[nextIndex++];

      if (!job) return;

      await this.loadTile(job.index, job.tier);
      await loadNext();
    };

    await Promise.all(Array.from({ length: WORKER_COUNT }, loadNext));

    this.workerController.destroyPool(this.fetchWorker.id);
  }

  private async loadTile(index: number, tier: TileTier): Promise<void> {
    console.log("loadTile start", performance.now(), index, tier);
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

      worker.postMessage({ index, url });
      console.log("loadTile end", performance.now(), index, tier);
    });
  }

  private async onTileLoaded(
    index: number,
    tier: TileTier,
    chunks: WorkerChunk[],
  ): Promise<void> {
    console.log("onTileLoaded start", performance.now(), index, tier);
    if (tier === "4k" && this.loadedTiers[index] === "high") {
      for (const chunk of chunks) {
        chunk.bitmap.close();
      }

      return;
    }

    for (const chunk of chunks) {
      this.bitmaps.push({
        index: chunk.index,
        segment: chunk.segment,
        bitmap: chunk.bitmap,
      });
    }

    this.loadedTiers[index] = tier;
    console.log("onTileLoaded end", performance.now(), index, tier);
  }

  async uploadNextSegment(renderer: THREE.WebGLRenderer): Promise<void> {
    if (this.tilePointer >= this.bitmaps.length) return;
    console.log("uploadNextSegment start", performance.now());
    const item = this.bitmaps[this.tilePointer];

    if (!item) return;

    const { index, segment, bitmap } = item;

    if (!bitmap) return;

    const segmentX = segment % 4;
    const segmentY = Math.floor(segment / 4);

    const x = segmentX * SEGMENT_WIDTH;
    const y = segmentY * SEGMENT_HEIGHT;

    const texture = this.materials[index].map;

    if (!texture) {
      bitmap.close();
      this.bitmaps[this.tilePointer].bitmap = null;
      this.tilePointer++;
      return;
    }

    const gl = renderer.getContext();

    const properties = renderer.properties.get(texture) as {
      __webglTexture?: WebGLTexture;
    };

    const webglTexture = properties.__webglTexture;

    if (!webglTexture) return;

    gl.bindTexture(gl.TEXTURE_2D, webglTexture);

    gl.texSubImage2D(gl.TEXTURE_2D, 0, x, y, gl.RGBA, gl.UNSIGNED_BYTE, bitmap);

    bitmap.close();
    this.bitmaps[this.tilePointer].bitmap = null;
    this.tilePointer++;
    console.log("uploadNextSegment end", performance.now());
  }
}

let moonInstance: MoonManager | null = null;

export function createMoon(scene: THREE.Scene) {
  return (moonInstance ??= new MoonManager(scene));
}
