import type { Metadata } from "next";
import { real } from "@/content/real";
const descriptions: Record<string, string> = {
  "/": "Dodzel Engineering Limited: industrial construction and EPC services in Pakistan, Qatar, Saudi Arabia and Iraq.",
  "/about":
    "About Dodzel Engineering Limited, founded in 2020 and registered with SECP in Pakistan.",
  "/services":
    "Civil, mechanical, electrical, structural steel, plant, offshore and project facilities services from Dodzel Engineering.",
  "/sectors":
    "Dodzel Engineering sectors: Oil & Gas, Refining, Power and Cement.",
  "/projects":
    "Project information for Dodzel Engineering. Approved project details will be added.",
  "/qhse":
    "Dodzel Engineering’s Zero Harm commitment to people, the public and the environment.",
  "/insights":
    "Insights from Dodzel Engineering. Approved editorial content will be added.",
  "/careers":
    "Careers at Dodzel Engineering. Opportunities and application details will be added.",
  "/contact":
    "Contact Dodzel Engineering in Lahore, Pakistan at info@dodzel.com.",
  "/conduct":
    "Conduct information for Dodzel Engineering. Approved policies will be added.",
  "/vendors":
    "Vendor information for Dodzel Engineering. Registration details will be added.",
  "/request-a-quote":
    "Validate your project requirements with Dodzel Engineering’s quote request preview.",
};
export function pageMetadata(title: string, path: string): Metadata {
  const description = descriptions[path];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${real.company.shortName}`,
      description,
      url: path,
      type: "website",
      siteName: real.company.shortName,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Dodzel Engineering — temporary social preview",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${real.company.shortName}`,
      description,
      images: ["/opengraph-image"],
    },
  };
}
