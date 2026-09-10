interface TileRequest {
  index: number;
  url: string;
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
  const { index, url } = data;
  console.log("fetch start", performance.now(), index);

  try {
    const response = await fetch(url);

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
      const sourceY = (1 - segmentY) * sourceChunkHeight;

      const chunk = await createImageBitmap(
        source,
        sourceX,
        sourceY,
        sourceChunkWidth,
        sourceChunkHeight,
        {
          resizeWidth: 1024,
          resizeHeight: 1024,
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

    console.log("fetch end", performance.now(), index);
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
