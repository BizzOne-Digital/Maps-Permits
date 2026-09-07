const PLACEHOLDER = "/images/placeholder.jpg";

export function getSafeImageUrl(url?: string | null): string {
  if (!url || typeof url !== "string" || url.trim() === "") {
    return PLACEHOLDER;
  }
  return url;
}

export default getSafeImageUrl;
