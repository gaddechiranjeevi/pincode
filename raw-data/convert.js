const fs = require("fs");
const csv = require("csv-parser");

const results = {};

fs.createReadStream("pincodes.csv")
  .pipe(csv())
  .on("data", (row) => {
    const pincode = row.pincode;

    if (!results[pincode]) {
      results[pincode] = {
        pincode,
        postOffices: []
      };
    }

    results[pincode].postOffices.push({
      office: row.officename,
      officeType: row.officetype,
      delivery: row.delivery,
      district: row.district,
      state: row.statename,
      circle: row.circlename,
      region: row.regionname,
      division: row.divisionname,
      lat: parseFloat(row.latitude) || null,
      lng: parseFloat(row.longitude) || null
    });
  })
  .on("end", () => {
    fs.writeFileSync(
      "pincodes.json",
      JSON.stringify(results, null, 2),
      "utf8"
    );
    console.log("✅ Conversion complete: pincodes.json created");
  });
