import { getPincode } from "../../lib/dataStore";
import fs from "fs";
import path from "path";

let SEARCH_INDEX = null;

function loadSearchIndex() {
  if (!SEARCH_INDEX) {
    SEARCH_INDEX = JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), "data", "search-index.json"),
        "utf8"
      )
    );
  }
}

export async function GET(req) {
  const q = new URL(req.url).searchParams.get("q");

  if (!q || q.trim().length < 2) {
    return Response.json([]);
  }

  const query = q.trim().toLowerCase();
  loadSearchIndex();

  const results = new Set();

  // ✅ 1. Exact pincode
  if (/^\d{6}$/.test(query)) {
    const data = getPincode(query);
    if (data) results.add(query);
  }

  // ✅ 2. Exact keyword ONLY (NO partial matching)
  if (SEARCH_INDEX[query]) {
    SEARCH_INDEX[query].forEach((p) => results.add(p));
  }

  const finalResults = Array.from(results)
    .slice(0, 20)
    .map((code) => getPincode(code))
    .filter(Boolean);

  return Response.json(finalResults);
}
