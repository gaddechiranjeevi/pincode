"use client";
import Link from "next/link";
import {formatDisplay} from "../lib/format";

export default function SearchResults({ results }) {
  if (!results || results.length === 0) return null;

  return (
    <section className="results-section">
      <h2 className="results-title">Search Results</h2>

      <div className="results-grid">
        {results.map((item) =>
          item.postOffices.map((po, index) => (
            <div className="result-card" key={`${item.pincode}-${index}`}>
              <div className="result-header">
                <Link href={`/pincode/${item.pincode}`}>
                  <span className="pincode">
                    Pincode {item.pincode}
                  </span>
                </Link>
              </div>

              <div className="result-body">
                <p className="office">{formatDisplay(po.office)}, {formatDisplay(po.delivery)}</p>
                <p className="location">
                  {formatDisplay(po.district)}, {formatDisplay(po.state)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
