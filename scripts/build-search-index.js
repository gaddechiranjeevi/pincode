import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "pincode-index.json");
const OUT_PATH = path.join(process.cwd(), "data", "search-index.json");

const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));

const searchIndex = Object.create(null);

function add(key, pincode) {
  if (!key) return;
  const k = key.toLowerCase().trim();
  if (!searchIndex[k]) searchIndex[k] = [];
  searchIndex[k].push(pincode);
}

for (const [pincode, info] of Object.entries(data)) {
  if (!info?.postOffices) continue;

  // ✅ Exact pincode
  add(pincode, pincode);

  for (const po of info.postOffices) {
    add(po.office, pincode);
    add(po.district, pincode);
    add(po.state, pincode);
  }
}

// 🔥 Remove duplicates
for (const key in searchIndex) {
  searchIndex[key] = [...new Set(searchIndex[key])];
}

fs.writeFileSync(OUT_PATH, JSON.stringify(searchIndex), "utf8");

console.log("✅ search-index.json created safely");
console.log("Keys:", Object.keys(searchIndex).length);
