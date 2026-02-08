import { getPincode } from "../../lib/dataStore";
import { notFound } from "next/navigation";
import Breadcrumbs from "../../components/Breadcrumbs";
import {formatDisplay} from "../../lib/format";
import { generatePincodeContent, generateFAQ } from "../../lib/generateContent";
import Link from "next/link";
import { getRelatedPincodes } from "../../lib/dataStore";

export async function generateMetadata({ params }) {
  const { code } = await params;

  return {
    
    title: `Pincode ${code} Details | WhatIsMyPincode`,
    description: `Find post offices, district, state and delivery details for pincode ${code}.`
  };
}

export default async function PincodePage({ params }) {
  const { code } = await params;
  

 const data = getPincode(code);

if (!data) return notFound();

const po = data.postOffices[0];
const related = getRelatedPincodes(po.district, code);
const contentData = {
  ...po,
  pincode: code
};

const content = generatePincodeContent(contentData);
const faqs = generateFAQ(contentData);

  return (
    <>
    <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "PostalAddress",
      "postalCode": code,
      "addressLocality": po.office,
      "addressRegion": po.state,
      "addressCountry": "IN"
    })
  }}
/>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          {
            label: formatDisplay(po.state).replace(/-/g, " "),
            href: `/state/${formatDisplay(po.state).toLowerCase().replace(/\s+/g, "-")}`
          },
          {
            label: formatDisplay(po.district).replace(/-/g, " "),
            href: `/state/${formatDisplay(po.state).toLowerCase().replace(/\s+/g, "-")}/district/${formatDisplay(po.district).toLowerCase().replace(/\s+/g, "-")}`
          },
          { label: `Pincode ${code}` }
        ]}
      />
<section className="results-section">                      
      <h1 className="results-title">Pincode {code}</h1>
     <div className="results-grid">
      {data.postOffices.map((po, i) => (
        <div className="result-card" key={i}>
          <strong className="result-office">{formatDisplay(po.office)}</strong>
          <p className="result-location">{formatDisplay(po.district)}, {formatDisplay(po.state)}</p>
        </div>
        
      ))}
      </div>
      </section>
      <section className="results-section">
        <section>
  <h3>About this pincode</h3>
  <p className="result-location">{content}</p>
</section>

<section>
  <h3>Frequently Asked Questions</h3>
  {faqs.map((faq, i) => (
    <div key={i}>
      <h3 className="result-office">{faq.q}</h3>
      <p className="result-location">{faq.a}</p>
    </div>
  ))}
</section>  
</section>

<section className="results-section">
  <h3>Other pincodes in {formatDisplay(po.district)}</h3>

  <div className="related-grid">
    {related.map((p) => (
      <Link key={p} href={`/pincode/${p}`} className="related-link">
        {p}
      </Link>
    ))}
  </div>
</section>
    </>
    
  );             
}
