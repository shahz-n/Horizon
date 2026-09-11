class WorkerController {
  private static instance: WorkerController | null = null;

  private readonly pools = new Map<
    string,
    {
      workers: { worker: Worker; occupied: boolean }[];
    }
  >();

  private constructor() {}

  static getInstance(): WorkerController {
    if (!WorkerController.instance) {
      WorkerController.instance = new WorkerController();
    }

    return WorkerController.instance;
  }

  createPool(id: string, url: URL, count: number): void {
    if (this.pools.has(id)) {
      return;
    }

    const workers = [];

    for (let i = 0; i < count; i++) {
      const worker = new Worker(url, { type: "module" });

      worker.onerror = (event) => {
        console.error(
          "WORKER ERROR",
          event.message,
          event.filename,
          event.lineno,
        );
      };

      worker.onmessageerror = (event) => {
        console.error("WORKER MESSAGE ERROR", event);
      };

      workers.push({
        worker,
        occupied: false,
      });
    }

    this.pools.set(id, { workers });
  }

  length(id: string): number {
    const pool = this.pools.get(id);

    return pool?.workers.length ?? 0;
  }

  acquireWorker(id: string): Worker | null {
    const pool = this.pools.get(id);

    if (!pool) {
      throw new Error(`Worker pool "${id}" does not exist`);
    }

    for (const entry of pool.workers) {
      if (!entry.occupied) {
        entry.occupied = true;
        return entry.worker;
      }
    }

    return null;
  }

  releaseWorker(id: string, worker: Worker): void {
    const pool = this.pools.get(id);

    if (!pool) {
      throw new Error(`Worker pool "${id}" does not exist`);
    }

    const entry = pool.workers.find((entry) => entry.worker === worker);

    if (entry) {
      entry.occupied = false;
    }
  }

  destroyPool(id: string): void {
    const pool = this.pools.get(id);

    if (!pool) {
      return;
    }

    for (const entry of pool.workers) {
      entry.worker.terminate();
    }

    this.pools.delete(id);
  }
}

export default WorkerController.getInstance();
