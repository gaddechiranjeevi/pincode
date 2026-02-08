export function formatDisplay(text) {
  if (text === undefined || text === null) return "";

  return String(text)
    .toLowerCase()
    .replace(/-/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());
}
