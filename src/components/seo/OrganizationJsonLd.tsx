import { real } from "@/content/real";
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: real.company.name,
    url: real.company.url,
    foundingDate: real.company.founded,
    email: real.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: real.contact.address,
      addressLocality: real.contact.locality,
      addressCountry: real.contact.country,
    },
    areaServed: real.countries.map((country) => ({
      "@type": "Country",
      name: country.name,
    })),
    subOrganization: real.subsidiaries.map((entity) => ({
      "@type": "Organization",
      name: entity.fullName,
      url: entity.url,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\u003c"),
      }}
    />
  );
}
