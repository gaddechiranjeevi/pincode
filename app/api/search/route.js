import fs from "fs";
import path from "path";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  // 🔹 Do NOT show anything before search
  if (!q || q.trim().length < 2) {
    return Response.json([]);
  }

  const query = q.trim().toLowerCase();

  const filePath = path.join(process.cwd(), "data", "pincodes.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const results = [];

  for (const pincodeKey in data) {
    const entry = data[pincodeKey];

    // 1️⃣ Match pincode directly
    if (pincodeKey.includes(query)) {
      for (const po of entry.postOffices) {
        results.push({
          pincode: pincodeKey,
          office: po.office,
          district: po.district,
          state: po.state
        });
      }
      continue;
    }

    // 2️⃣ Match inside post offices
    for (const po of entry.postOffices) {
      const office = po.office.toLowerCase();
      const district = po.district.toLowerCase();
      const state = po.state.toLowerCase();
      

      if (
        office.includes(query) ||
        district.includes(query) ||
        state.includes(query)
      ) {
        results.push({
          pincode: pincodeKey,
          office: po.office,
          district: po.district,
          state: po.state
        });
      }
    }

    // safety limit
    if (results.length >= 200) break;
  }

  return Response.json(results);
}
