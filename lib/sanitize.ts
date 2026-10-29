export function sanitizeComment(input: string): string {
  if (typeof window === "undefined") {
    return input.trim().replace(/<[^>]*>?/gm, "").slice(0, 2000);
  }
  const DOMPurify = require("isomorphic-dompurify");
  return DOMPurify.sanitize(input.trim(), { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }).slice(0,2000);
}
