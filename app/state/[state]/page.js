import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "../../components/Breadcrumbs";

export async function generateMetadata({ params }) {
  const { state } = await params;
  const name = state.replace(/-/g, " ");

  return {
    title: `${name} Districts – Pincode Directory`,
    description: `Browse districts in ${name} to find pincodes`
  };
}

export default async function StatePage({ params }) {
  const { state } = await params;
  const stateName = state.replace(/-/g, " ").toLowerCase();

  const filePath = path.join(process.cwd(), "data", "pincodes.json");
  const raw = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(raw);

  const allData = Object.values(data);

  const districts = [
    ...new Set(
      allData.flatMap(item =>
        item.postOffices
          .filter(po => po.state.toLowerCase() === stateName)
          .map(po => po.district)
      )
    )
  ].sort();

  if (districts.length === 0) return notFound();

  return (
    <>
    <Breadcrumbs
  items={[
    { label: "Home", href: "/" },
    { label: "States", href: "/states" },
    { label: state.replace(/-/g, " ") }
  ]}
/>
    <section className="results-section">
      <h1 className="results-title">Districts in {stateName}</h1>

      <div className="results-grid">
        {districts.map(district => (
          <div className="result-card" key={district}>
            <Link
              className="result-pincode"
              href={`/state/${state}/district/${district
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
            >
              {district}
            </Link>
          </div>
        ))}
      </div>
    </section>
    </>
  );
}
