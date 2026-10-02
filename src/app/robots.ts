import type { MetadataRoute } from "next";
import { real } from "@/content/real";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/studio/", "/studio"] },
    sitemap: `${real.company.url}/sitemap.xml`,
  };
}
