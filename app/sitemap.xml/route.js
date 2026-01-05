import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "data", "pincodes.json");
  const raw = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(raw);

  // data is an OBJECT → use Object.keys
  const pincodes = Object.keys(data);

  const baseUrl = "https://whatismypincode.in";

  const urls = pincodes
    .map(code => {
      return `
  <url>
    <loc>${baseUrl}/pincode/${code}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
    })
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml"
    }
  });
}
