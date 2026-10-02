import type { MetadataRoute } from "next";
import { navLinks, secondaryLinks } from "@/lib/nav";
import { real } from "@/content/real";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...new Set([
      "/",
      ...navLinks.map((link) => link.href),
      ...secondaryLinks.map((link) => link.href),
      "/request-a-quote",
    ]),
  ].map((path) => ({ url: new URL(path, real.company.url).href }));
}
