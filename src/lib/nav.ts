export const serviceGroups = [
  {
    title: "Plan & Procure",
    services: [
      "Engineering",
      "Procurement & Supply Chain",
      "Project Management",
    ],
  },
  {
    title: "Build & Maintain",
    services: [
      "Civil & Buildings",
      "Mechanical & Piping",
      "Electrical & Instrumentation",
      "Structural Steel",
      "Plant Services (Turnaround & Shutdown)",
      "Offshore",
      "Project Facilities",
    ],
  },
];
export const sectors = ["Oil & Gas", "Refining", "Power", "Cement"];
export const navLinks = [
  "About",
  "Services",
  "Sectors",
  "Projects",
  "QHSE",
  "Insights",
  "Careers",
].map((label) => ({ label, href: `/${label.toLowerCase()}` }));
export const secondaryLinks = [
  { label: "Conduct", href: "/conduct" },
  { label: "Become a Vendor", href: "/vendors" },
  { label: "Contact", href: "/contact" },
];
export const subsidiaries = [
  { name: "Belgrass", detail: "Construction · Qatar" },
  { name: "Bimex", detail: "Trading · Qatar" },
  { name: "Novex", detail: "Trading · Pakistan" },
];
export const serviceHref = (name: string) =>
  `/services#${name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-$/, "")}`;
export const sectorHref = (name: string) =>
  `/sectors#${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
