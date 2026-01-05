import fs from "fs";
import path from "path";
import Link from "next/link";

export default function DistrictsPage() {
  const filePath = path.join(process.cwd(), "data", "pincodes.json");
  const raw = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(raw);

  const districts = new Set();

  Object.values(data).forEach(item => {
    item.postOffices.forEach(po => {
      districts.add(`${po.district}|||${po.state}`);
    });
  });

  const districtList = [...districts].sort();

  return (
    <section className="results-section">
      <h1 className="results-title">All Districts in India</h1>

      <div className="results-grid">
        {districtList.map((d, i) => {
          const [district, state] = d.split("|||");
          return (
            <Link
              key={i}
              className="result-card"
              href={`/state/${state.toLowerCase().replace(/\s+/g,"-")}/district/${district.toLowerCase().replace(/\s+/g,"-")}`}
            >
              <strong>{district}</strong>
              <p>{state}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
