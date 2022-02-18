export function replaceRequestHeaders(
  oldHeaders: Record<string, string>,
  newHeaders: Record<string, string>,
) {
  Object.entries(newHeaders).forEach(([key, value]) => {
    oldHeaders[key] = value;
  });
  return oldHeaders;
}
