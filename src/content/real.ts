// Facts supplied in the Phase 2 brief, attributed there to dodzel.com.
// Live source was unreachable during implementation; CONFIRM is mandatory before publication.
const reviewed = <T extends object>(item: T) => ({
  ...item,
  source: "dodzel.com (current site)" as const,
  confirm: true as const,
});
export const real = {
  company: reviewed({
    name: "Dodzel Engineering Limited",
    shortName: "Dodzel Engineering",
    founded: "2020",
    registration: "Public limited company registered with SECP, Pakistan",
    description:
      "Founded in 2020, Dodzel Engineering Limited is a public limited company registered with SECP in Pakistan.",
    ceo: "Syed Tahir Hussain",
    url: "https://dodzel.com",
  }),
  contact: reviewed({
    address:
      "Office #219/20, 3rd Floor, Mamoona Center, Syed Moaj Darya Road, Lahore, Pakistan",
    email: "info@dodzel.com",
    locality: "Lahore",
    country: "PK",
  }),
  countries: ["Pakistan", "Qatar", "Saudi Arabia", "Iraq"].map((name) =>
    reviewed({ name }),
  ),
  entities: [
    reviewed({ name: "Dodzel Engineering Ltd", country: "Pakistan" }),
    reviewed({ name: "Novex Trading Company", country: "Pakistan" }),
    reviewed({ name: "Dodzel Engineering Qatar WLL", country: "Qatar" }),
    reviewed({ name: "Belgrass Construction Company WLL", country: "Qatar" }),
    reviewed({ name: "Bimex Trading Company", country: "Qatar" }),
  ],
  subsidiaries: [
    reviewed({
      name: "Belgrass",
      fullName: "Belgrass Construction Company WLL",
      country: "Qatar",
      detail: "Construction · Qatar",
      description:
        "Construction services in Qatar for Oil & Gas, Power and Cement.",
      url: "https://belgrass.com.qa",
    }),
    reviewed({
      name: "Bimex",
      fullName: "Bimex Trading Company",
      country: "Qatar",
      detail: "Supply chain · Qatar",
      description:
        "Supply chain services for construction equipment, piping materials and fittings, and industrial equipment.",
      url: "https://bimex.com.qa",
    }),
    reviewed({
      name: "Novex",
      fullName: "Novex Trading Company",
      country: "Pakistan",
      detail: "Machine technologies · Pakistan",
      description: "Machine technologies for Pakistan.",
      url: "https://novex.com.pk",
    }),
  ],
  services: [
    reviewed({
      name: "Civil & Buildings",
      description: "Civil works and building construction.",
    }),
    reviewed({
      name: "Mechanical & Piping",
      description: "Piping contracting and EPIC services.",
    }),
    reviewed({
      name: "Electrical & Instrumentation",
      description:
        "Electrical, instrumentation and telecommunications services.",
    }),
    reviewed({
      name: "Structural Steel",
      description:
        "Supply, fabrication and erection of structural steel for warehouses, workshops and pipe racks.",
    }),
    reviewed({
      name: "Plant Services (Turnaround & Shutdown)",
      description:
        "Turnaround and shutdown services, including scaffolding, painting, insulation and repair (SPIR).",
    }),
    reviewed({
      name: "Offshore",
      description: "Offshore field maintenance services.",
    }),
    reviewed({
      name: "Project Facilities",
      description: "Project facilities services for industrial construction.",
    }),
  ],
  qhse: reviewed({
    title: "Zero Harm",
    description:
      "Our Zero Harm commitment is to protect our people, the public and the environment.",
  }),
  stats: [
    reviewed({
      value: "Since 2020",
      label: "Founded in Pakistan",
      numericValue: null,
    }),
    reviewed({ value: "4", label: "Countries", numericValue: null }),
    reviewed({ value: "3", label: "Subsidiaries", numericValue: null }),
    reviewed({ value: "7", label: "Service lines", numericValue: null }),
  ],
};
