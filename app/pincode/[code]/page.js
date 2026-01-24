import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Breadcrumbs from "../../components/Breadcrumbs";

export async function generateMetadata({ params }) {
  const { code } = await params;

  return {
    title: `${code} Pincode - Post Office, Area, District & State Details`,
    description: `Find post office, district and state details for pincode ${code}`
  };
}

export default async function PincodePage({ params }) {
  const { code } = await params;

  const filePath = path.join(process.cwd(), "data", "pincodes.json");
  const raw = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(raw);

  const pincodeData = data[code];

  if (!pincodeData) return notFound();

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Pincode" },
          { label: code }
        ]}
      />

    <section className="results-section">
  <h1 className="results-title">Pincode {code}</h1>

  <div className="results-grid">
    {pincodeData.postOffices.map((po, index) => (
      <div className="result-card" key={index}>

        <span className="result-pincode">
          Pincode {code}
        </span>

        <p className="result-office">{po.office}</p>

        <p className="result-location">
          {po.taluk}, {po.district}, {po.state}
        </p>


      </div>
      
      
    ))}
  </div>
  
</section>
</>
  );
}
