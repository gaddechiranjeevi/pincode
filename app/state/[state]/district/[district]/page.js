import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "../../../../components/Breadcrumbs";

 
export async function generateMetadata({ params }) {
  const { state, district } = await params;

  const stateName = state?.replace(/-/g, " ") || "";
  const districtName = district?.replace(/-/g, " ") || "";

  return {
    title: `${districtName} Pincode List, ${stateName}`,
    description: `Complete list of PIN codes in ${districtName}, ${stateName}. Find post offices, taluk and postal details.`
  };
}




export default async function DistrictPage({ params }) {
  const { state, district } = await params;

  const stateName = state.replace(/-/g, " ").toLowerCase();
  const districtName = district.replace(/-/g, " ").toLowerCase();

  const filePath = path.join(process.cwd(), "data", "pincodes.json");
  const raw = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(raw);

  const allData = Object.values(data);

  const pincodes = allData.filter(item =>
    item.postOffices.some(
      po =>
        po.state.toLowerCase() === stateName &&
        po.district.toLowerCase() === districtName
    )
  );

  if (pincodes.length === 0) return notFound();

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "States", href: "/states" },
          { label: state.replace(/-/g, " ") },
          { label: district.replace(/-/g, " ") }
        ]}
      />
    <section className="results-section">
      <h1 className="results-title">
        Pincodes in {districtName}
      </h1>

      <div className="results-grid">
        {pincodes.map(item => (
          <div className="result-card" key={item.pincode}>
            <Link
              className="result-pincode"
              href={`/pincode/${item.pincode}`}
            >
              Pincode {item.pincode}
            </Link>

            <p className="result-location">
              {districtName}, {stateName}
            </p>
          </div>
        ))}
      </div>
    </section>
    </>
  );
}
