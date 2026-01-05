import fs from "fs";
import path from "path";
import Link from "next/link";

export const metadata = {
  title: "States – Indian Pincode Directory",
  description: "Browse Indian states to find district and pincode details"
};

export default function StatesPage() {
  const filePath = path.join(process.cwd(), "data", "pincodes.json");
  const raw = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(raw);

  const allData = Object.values(data);

  const states = [
    ...new Set(
      allData.flatMap(item =>
        item.postOffices.map(po => po.state)
      )
    )
  ].sort();

  return (
    <section className="results-section">
      <h1 className="results-title">States in India</h1>

      <div className="results-grid">
        {states.map(state => (
          <div className="result-card" key={state}>
            <Link
              className="result-pincode"
              href={`/state/${state.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {state}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
