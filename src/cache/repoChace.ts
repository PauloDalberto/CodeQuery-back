export let cachedFilesContent: { [key: string]: string } = {};

export function setCachedFilesContent(content: { [key: string]: string }) {
  cachedFilesContent = content;
}

export function getCachedFilesContent() {
  return cachedFilesContent;
}
