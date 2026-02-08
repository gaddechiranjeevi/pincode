import Breadcrumbs from "../../components/Breadcrumbs";
import { getDistricts } from "../../lib/dataStore";
import {formatDisplay} from "../../lib/format";


export async function generateMetadata({ params }) {
  const { state } = await params
  const stateName =state.replace(/-/g, " ");

  return {
    title: `${formatDisplay(stateName)} Pincode List | WhatIsMyPincode`,
    description: `Find all districts and pincodes in ${formatDisplay(stateName)}. Search post offices, districts and areas.`
  };
}


export default async function StatePage({ params }) {
  const { state } = await params;

  const districts = getDistricts(state);



  return (
    <>
    
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: formatDisplay(state) }
        ]}
      />
    <section className="results-section">
      <h1 className="results-title">{formatDisplay(state).replace(/-/g, " ")}</h1>

     <div className="results-grid">
      {Object.keys(districts).map((d) => (
        <div className="result-card" key={d}>
          <a href={`/state/${state}/district/${d}`} >
            {formatDisplay(d)}
          </a>
        </div>
      ))}
      </div>
      </section>
      
    </>
  );
}
