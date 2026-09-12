interface TileRequest {
  index: number;
  url: string;
  priority?: RequestPriority;
  segmentWidth?: number;
  segmentHeight?: number;
}

interface TileChunk {
  index: number;
  segment: number;
  bitmap: ImageBitmap;
}

interface TileResponse {
  index: number;
  chunks?: TileChunk[];
  error?: string;
}

const workerScope = self as unknown as {
  postMessage(message: TileResponse, transfer?: Transferable[]): void;
};

self.onmessage = async ({ data }: MessageEvent<TileRequest>) => {
  const {
    index,
    url,
    priority = "auto",
    segmentWidth = 1024,
    segmentHeight = 1024,
  } = data;

  try {
    const response = await fetch(url, { priority: priority });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const blob = await response.blob();
    const source = await createImageBitmap(blob);

    const sourceChunkWidth = source.width / 4;
    const sourceChunkHeight = source.height / 2;

    const chunks: TileChunk[] = [];

    for (let segment = 0; segment < 8; segment++) {
      const segmentX = segment % 4;
      const segmentY = Math.floor(segment / 4);

      const sourceX = segmentX * sourceChunkWidth;
      const sourceY = segmentY * sourceChunkHeight;

      const chunk = await createImageBitmap(
        source,
        sourceX,
        sourceY,
        sourceChunkWidth,
        sourceChunkHeight,
        {
          resizeWidth: segmentWidth,
          resizeHeight: segmentHeight,
          imageOrientation: "flipY",
          premultiplyAlpha: "none",
          colorSpaceConversion: "none",
        },
      );

      chunks.push({
        index,
        segment,
        bitmap: chunk,
      });
    }
    source.close();

    workerScope.postMessage(
      {
        index,
        chunks,
      } satisfies TileResponse,
      chunks.map(({ bitmap }) => bitmap),
    );
  } catch (error) {
    workerScope.postMessage({
      index,
      error: String(error),
    } satisfies TileResponse);
  }
};
