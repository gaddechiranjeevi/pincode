const fs = require("fs");
const path = require("path");

const inputPath = path.join(__dirname, "../raw-data/all-pincodes.json");
const outputPath = path.join(__dirname, "../data/pincodes.json");

const rawData = JSON.parse(fs.readFileSync(inputPath, "utf-8"));

const result = {};

rawData.forEach(item => {
  const pincode = String(item.pincode);
  if (!pincode) return;

  if (!result[pincode]) {
    result[pincode] = {
      pincode,
      postOffices: []
    };
  }

  result[pincode].postOffices.push({
    office: item.officeName || "",
    taluk: item.taluk || "",
    district: item.districtName || "",
    state: formatState(item.stateName || "")
  });
});

function formatState(state) {
  return state
    .toLowerCase()
    .replace(/\b\w/g, c => c.toUpperCase());
}

fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
console.log("✅ Pincodes grouped by post offices successfully");
