self.onmessage = async (e: MessageEvent<{ index: number; url: string }>) => {
  const { index, url } = e.data;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const blob = await res.blob();
    const bitmap = await createImageBitmap(blob);
    (self as any).postMessage({ index, bitmap }, [bitmap]);
  } catch (err) {
    (self as any).postMessage({ index, error: String(err) });
  }
};




