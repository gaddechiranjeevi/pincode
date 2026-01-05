"use client";

import Link from "next/link";

export default function SearchResults({ results }) {
  if (!results || results.length === 0) return null;

  return (
    <section className="results-section">
      <h2 className="results-title">Search Results</h2>

      <div className="results-grid">
        {results.map((item, index) => (
          <div className="result-card" key={index}>
            <div className="result-header">
              <Link href={`/pincode/${item.pincode}`}>
                <span className="pincode">
                  Pincode {item.pincode}
                </span>
              </Link>
            </div>

            <div className="result-body">
              <p className="office">{item.office}</p>
              <p className="location">
                {item.taluk}, {item.district}, {item.state}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
