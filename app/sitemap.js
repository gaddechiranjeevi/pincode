import fs from "fs";
import path from "path";

let cachedSitemap = null;

export default function sitemap() {
  if (cachedSitemap) return cachedSitemap;

  const baseUrl = "https://whatismypincode.in";

  const data = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "data", "pincode-index.json"),
      "utf8"
    )
  );

  cachedSitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...Object.keys(data).map(code => ({
      url: `${baseUrl}/pincode/${code}`,
      lastModified: new Date(),
    })),
  ];

  return cachedSitemap;
}