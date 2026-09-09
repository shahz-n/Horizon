import * as THREE from "three";

const MOON_RADIUS = 6;

type TileTier = "4k" | "high";

const TEXTURE_TILES = {
  critical: [0, 1],
  high: [3, 4, 5, 7],
  medium: [8, 9, 11, 12, 13, 15],
  low: [2, 6, 10, 14],
};

type BatchPriority = keyof typeof TEXTURE_TILES;

export interface MoonSystem {
  mesh: THREE.Mesh;
  setPositionAndScale(pos: THREE.Vector3, scale: number): void;
  setRotation(rotX: number, rotY: number): void;
  loadSlices(): void;
}

class MoonManager implements MoonSystem {
  readonly mesh: THREE.Mesh;
  private readonly targetTier: "16k" | "8k";
  private readonly sliceWidth: number;
  private readonly sliceHeight: number;
  private readonly canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null = null;
  private texture: THREE.CanvasTexture | null = null;
  private readonly loadedTiers: (TileTier | null)[] = new Array(16).fill(null);

  constructor(scene: THREE.Scene) {
    const geometry = new THREE.SphereGeometry(MOON_RADIUS, 128, 128);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 1.0,
      metalness: 0.0,
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(0, -17.5, -6);
    this.mesh.scale.setScalar(12);
    scene.add(this.mesh);

    const isLargeScreen = window.innerWidth > 1024 || window.innerHeight > 1024;
    this.targetTier = isLargeScreen ? "16k" : "8k";
    this.sliceWidth = isLargeScreen ? 4096 : 2048;
    this.sliceHeight = isLargeScreen ? 2048 : 1024;

    this.canvas = document.createElement("canvas");
    this.canvas.width = this.sliceWidth * 4;
    this.canvas.height = this.sliceHeight * 4;
  }

  setPositionAndScale(pos: THREE.Vector3, scale: number): void {
    this.mesh.position.copy(pos);
    this.mesh.scale.setScalar(scale);
  }

  setRotation(rotX: number, rotY: number): void {
    this.mesh.rotation.x = rotX;
    this.mesh.rotation.y = rotY;
  }

  loadSlices(): void {
    this.loadCriticalPrefetch();
    this.dispatchBatch(0);
  }

  private loadCriticalPrefetch(): void {
    for (const index of TEXTURE_TILES.critical) {
      const pad = String(index).padStart(2, "0");
      fetch(`/moon/4k/${pad}.jpg`)
        .then((res) => (res.ok ? res.blob() : Promise.reject(res.statusText)))
        .then((blob) => createImageBitmap(blob))
        .then((bitmap) => this.onTileLoaded(index, "4k", bitmap))
        .catch((err) =>
          console.warn(`[moon] Prefetched 4k tile ${index} failed:`, err),
        );
    }
  }

  private dispatchBatch(batchIndex: number): void {
    const batchKeys = Object.keys(TEXTURE_TILES) as BatchPriority[];
    if (batchIndex >= batchKeys.length) return;

    const batchKey = batchKeys[batchIndex];
    const indices = TEXTURE_TILES[batchKey];
    if (indices.length === 0) {
      this.dispatchBatch(batchIndex + 1);
      return;
    }

    let completedInBatch = 0;
    const onDone = () => {
      completedInBatch++;
      if (completedInBatch === indices.length) {
        this.dispatchBatch(batchIndex + 1);
      }
    };

    for (const index of indices) {
      const pad = String(index).padStart(2, "0");
      const worker = new Worker(new URL("./moonWorker.ts", import.meta.url), {
        type: "module",
      });

      worker.onmessage = (
        e: MessageEvent<{ bitmap?: ImageBitmap; error?: string }>,
      ) => {
        const { bitmap, error } = e.data;
        if (error) {
          console.warn(
            `[moon] High-res tile ${index} (${batchKey}) failed:`,
            error,
          );
        } else if (bitmap) {
          this.onTileLoaded(index, "high", bitmap);
        }
        worker.terminate();
        onDone();
      };

      worker.postMessage({
        index,
        url: `/moon/${this.targetTier}/${pad}.jpg`,
      });
    }
  }

  private onTileLoaded(
    index: number,
    tier: TileTier,
    bitmap: ImageBitmap,
  ): void {
    if (tier === "4k" && this.loadedTiers[index] === "high") {
      bitmap.close();
      return;
    }

    if (!this.texture) {
      this.ctx = this.canvas.getContext("2d");
      this.texture = new THREE.CanvasTexture(this.canvas);
      this.texture.colorSpace = THREE.SRGBColorSpace;

      (this.mesh.material as THREE.Material).dispose();
      this.mesh.material = new THREE.MeshStandardMaterial({
        map: this.texture,
        roughness: 1.0,
        metalness: 0.0,
      });
    }

    const col = index % 4;
    const row = Math.floor(index / 4);

    if (this.ctx) {
      this.ctx.drawImage(
        bitmap,
        col * this.sliceWidth,
        row * this.sliceHeight,
        this.sliceWidth,
        this.sliceHeight,
      );
      this.loadedTiers[index] = tier;
      bitmap.close();
      this.texture.needsUpdate = true;
    }
  }
}

let moonInstance: MoonManager | null = null;

export function createMoon(scene: THREE.Scene): MoonSystem {
  if (!moonInstance) {
    moonInstance = new MoonManager(scene);
  }
  return moonInstance;
}
