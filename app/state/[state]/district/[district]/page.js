import Breadcrumbs from "../../../../components/Breadcrumbs";
import { getPincodes } from "../../../../lib/dataStore";
import {formatDisplay} from "../../../../lib/format";


export async function generateMetadata({ params }) {

  const { state } = await params;
  const { district } = await params;
  const stateName = state.replace(/-/g, " ");
  const districtName = district.replace(/-/g, " ");

  return {
    title: `${formatDisplay(districtName)} Pincode List, ${formatDisplay(stateName)}`,
    description: `Complete list of pincodes in ${formatDisplay(districtName)}, ${formatDisplay(stateName)}. Find post offices, delivery areas and PIN details.`
  };
}

export default async function DistrictPage({ params }) {
  const { state, district } = await params;

  const pincodes = getPincodes(state, district);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          {
            label: formatDisplay(state).replace(/-/g, " "),
            href: `/state/${state}`
          },
          { label: formatDisplay(district).replace(/-/g, " ") }
        ]}
      />
      <section className="results-section">
      <h1 className="results-title">{formatDisplay(district).replace(/-/g, " ")}</h1>
      <div className="results-grid">
      {pincodes.map((code) => (
        <div className="result-card" key={code}>
          <a className="result-pincode" href={`/pincode/${code}`}>Pincode {code}</a>
          <p className="result-location">{formatDisplay(district)}, {formatDisplay(state)}</p>
        </div>
      ))}
      </div>
      </section>
    </>
  );
}
