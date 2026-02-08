import fs from "fs";
import path from "path";

let PINCODE_INDEX;
let STATE_INDEX;
let SEARCH_INDEX;

export function loadData() {
  if (!PINCODE_INDEX) {
    PINCODE_INDEX = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "data", "pincode-index.json"), "utf8")
    );

    STATE_INDEX = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "data", "state-index.json"), "utf8")
    );

    SEARCH_INDEX = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "data", "search-index.json"), "utf8")
    );
  }
}

export function getPincode(code) {
  loadData();
  return PINCODE_INDEX[code];
}

export function getStates() {
  loadData();
  return Object.keys(STATE_INDEX);
}

export function getDistricts(state) {
  loadData();
  return STATE_INDEX[state] || {};
}

export function getPincodes(state, district) {
  loadData();
  return STATE_INDEX[state]?.[district] || [];
}

export function search(query) {
  loadData();

  if (!query) return [];

  const q = query.toLowerCase().trim();

  /* 1️⃣ Exact 6-digit pincode */
  if (/^\d{6}$/.test(q)) {
    return PINCODE_INDEX[q] ? [PINCODE_INDEX[q]] : [];
  }

  /* 2️⃣ Partial pincode */
  if (/^\d{3,5}$/.test(q)) {
    return Object.keys(PINCODE_INDEX)
      .filter(code => code.startsWith(q))
      .slice(0, 20)
      .map(code => PINCODE_INDEX[code]);
  }

  /* 3️⃣ Keyword search with STATE FILTER */
  if (SEARCH_INDEX[q]) {
    return SEARCH_INDEX[q]
      .map(code => PINCODE_INDEX[code])
      .filter(item =>
        item &&
        item.postOffices?.some(po =>
          po.state.toLowerCase().includes(q) ||
          po.district.toLowerCase().includes(q) ||
          po.office.toLowerCase().includes(q)
        )
      )
      .slice(0, 20);
  }
console.log("hit", query);
  return [];
}

export function getRelatedPincodes(district, excludeCode) {
  loadData();
  const results = [];


  for (const [code, entry] of Object.entries(PINCODE_INDEX)) {
    const po = entry.postOffices[0];

    if (
      po.district === district &&
      code !== excludeCode
    ) {
      results.push(code);
    }

    if (results.length >= 12) break;
  }

  return results;
}