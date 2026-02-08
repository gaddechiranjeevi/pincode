"use client";

import { useState } from "react";
import SearchResults from "./SearchResults";

export default function HomeSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [searched, setSearched] = useState(false);

  async function handleSearch() {
    if (!query) return;
    setSearched(true);
    console.log("QUERY:", query);
    const res = await fetch(`/api/search?q=${query}`);
    console.log("RESPONSE STATUS:", res.status);
    const data = await res.json();
    console.log("SEARCH DATA:", data);
  

    setResults(data);
  }
   function clearSearch() {
    setQuery("");
    setResults(null);
    setSearched(false);
  }

  return (
    <>
      <div className="search-box">
  <div className="search-input-wrapper">
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search pincode, post office, district or state"
    />

    {query && (
      <span
        className="clear-btn"
        onClick={clearSearch}
      >
        ×
      </span>
    )}
  </div>

  <button
    className="search-btn"
    onClick={handleSearch}
  >
    Search
  </button>
</div>



      {searched && results?.length === 0 && (
        <p style={{ marginTop: "20px" }}>No results found</p>
      )}

      {results && results.length > 0 && (
        <SearchResults results={results} />
      )}
    </>
  );
}
