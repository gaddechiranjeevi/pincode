/**
 * One-time script
 * CSV / old JSON → optimized JSON indexes
 */

import fs from "fs";
import path from "path";

const SOURCE_FILE = path.join(process.cwd(), "data", "pincodes.json");

// OUTPUT FILES
const PINCODE_INDEX_FILE = path.join(process.cwd(), "data", "pincode-index.json");
const STATE_INDEX_FILE = path.join(process.cwd(), "data", "state-index.json");
const SEARCH_INDEX_FILE = path.join(process.cwd(), "data", "search-index.json");

const raw = fs.readFileSync(SOURCE_FILE, "utf8");
const data = JSON.parse(raw);

const pincodeIndex = {};
const stateIndex = {};
const searchIndex = {};

function slugify(str) {
  return str.toLowerCase().replace(/\s+/g, "-");
}

for (const code in data) {
  const record = data[code];
  pincodeIndex[code] = record;

  record.postOffices.forEach((po) => {
    const stateSlug = slugify(po.state);
    const districtSlug = slugify(po.district);

    // STATE → DISTRICT → PINCODES
    if (!stateIndex[stateSlug]) stateIndex[stateSlug] = {};
    if (!stateIndex[stateSlug][districtSlug])
      stateIndex[stateSlug][districtSlug] = [];

    if (!stateIndex[stateSlug][districtSlug].includes(code)) {
      stateIndex[stateSlug][districtSlug].push(code);
    }

    // SEARCH INDEX (state / district / office)
    [
      po.state,
      po.district,
      po.office
    ].forEach((key) => {
      const k = key.toLowerCase();
      if (!searchIndex[k]) searchIndex[k] = [];
      if (!searchIndex[k].includes(code)) searchIndex[k].push(code);
    });
  });
}

fs.writeFileSync(PINCODE_INDEX_FILE, JSON.stringify(pincodeIndex));
fs.writeFileSync(STATE_INDEX_FILE, JSON.stringify(stateIndex));
fs.writeFileSync(SEARCH_INDEX_FILE, JSON.stringify(searchIndex));

console.log("✅ Data indexes generated successfully");
