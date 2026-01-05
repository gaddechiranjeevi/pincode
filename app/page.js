import HomeSearch from "./components/HomeSearch";

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <h1>What Is My Pincode...?</h1>
        <p>
          Search Indian pincodes by post office, district or state
        </p>
        <HomeSearch />
      </section>

      <section className="home-info container">
  <h2>How to Use WhatIsMyPincode</h2>
  <ul>
    <li>Enter a 6-digit Indian PIN code in the search box</li>
    <li>Or search using post office, district, or state name</li>
    <li>Click the search button to view matching results</li>
    <li>"B.O" means Branch Office, "S.O" means Sub Office </li>
  </ul>

  <h2>What Information Can You Find?</h2>
  <p>
    This website helps you find accurate postal details related to Indian
    PIN codes. You can view information such as post office name, area,
    district, taluk, and state for a given PIN code.
  </p>

  <h2>Why Use WhatIsMyPincode?</h2>
  <p>
    Finding the correct PIN code is important for deliveries, address
    verification, and official documentation. WhatIsMyPincode provides
    a fast and easy way to access Indian postal information in one place.
  </p>
  <p>
    Using our search tool, users can easily look up details such as post office
    name, district, state, and local area by entering a PIN code or related
    location information. This service is useful for individuals, businesses,
    and organizations that require accurate postal data for deliveries,
    address verification, or general reference.
  </p>

</section>

    </main>
  );
}
