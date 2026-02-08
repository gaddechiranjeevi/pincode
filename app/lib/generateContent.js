import { formatDisplay } from "./format";
export function generatePincodeContent(data) {

  const pincode = data.pincode || data.code;
  const office = data.office;
  const district = data.district;
  const state = data.state;

  return `
Pincode ${pincode} is served by ${formatDisplay(office)} post office in ${formatDisplay(district)} district of ${formatDisplay(state)}, India.

This area relies on this postal code for accurate mail delivery,
courier services, and online shopping logistics. Using the correct
pincode ensures faster parcel routing and avoids delivery delays.

The ${formatDisplay(office)} office plays an important role in connecting residents
and businesses in ${formatDisplay(district)} with India’s nationwide postal network.
`;
}

export function generateFAQ(data) {

  const pincode = data.pincode || data.code;
  const office = data.office;

  return [
    {
      q: `Which post office handles pincode ${pincode}?`,
      a: `${formatDisplay(office)} post office manages deliveries for this area.`
    },
    {
      q: `Why should I use the correct pincode?`,
      a: `Using the right pincode ensures accurate and faster delivery of mail and parcels.`
    }
  ];
}