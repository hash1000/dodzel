import { IS_PRODUCTION } from "@/lib/constants";
import type { MetadataRoute } from "next";
import { navLinks, secondaryLinks, serviceNames, serviceHref } from "@/lib/nav";
import { real } from "@/content/real";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!IS_PRODUCTION) return [];
  return [
    ...new Set([
      "/",
      ...navLinks.map((link) => link.href),
      ...secondaryLinks.map((link) => link.href),
      "/request-a-quote",
      ...serviceNames.map(serviceHref),
    ]),
  ].map((path) => ({ url: new URL(path, real.company.url).href }));
}
