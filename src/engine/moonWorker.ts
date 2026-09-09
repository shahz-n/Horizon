interface TileRequest {
  index: number;
  url: string;
}

interface TileResponse {
  index: number;
  bitmap?: ImageBitmap;
  error?: string;
}

const workerScope = self as unknown as {
  postMessage(message: TileResponse, transfer?: Transferable[]): void;
};

self.onmessage = async ({ data }: MessageEvent<TileRequest>) => {
  const { index, url } = data;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const blob = await res.blob();
    const bitmap = await createImageBitmap(blob);
    workerScope.postMessage(
      { index, bitmap } satisfies TileResponse,
      [bitmap],
    );
  } catch (err) {
    workerScope.postMessage({
      index,
      error: String(err),
    } satisfies TileResponse);
  }
};

