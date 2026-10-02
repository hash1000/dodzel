import { IS_PRODUCTION } from "@/lib/constants";
import type { MetadataRoute } from "next";
import { real } from "@/content/real";
export default function robots(): MetadataRoute.Robots {
  if (!IS_PRODUCTION) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/studio/", "/studio"] },
    sitemap: `${real.company.url}/sitemap.xml`,
  };
}
