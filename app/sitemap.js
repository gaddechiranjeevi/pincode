import fs from "fs";
import path from "path";

export default function sitemap() {
  const filePath = path.join(process.cwd(), "data", "pincodes.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  return data.map(item => ({
    url: `https://yourdomain.com/pincode/${item.pincode}`,
    lastModified: new Date(),
  }));
}