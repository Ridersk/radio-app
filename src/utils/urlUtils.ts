export function formatUrlToHttps(url: string) {
  if (url.startsWith("http://")) {
    return "https://" + url.slice(7);
  }
  return url;
}
