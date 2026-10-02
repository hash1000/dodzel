import { real } from "@/content/real";
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
      "Maintenance",
    ],
  },
];
export const sectorData = [
  { id: "oil-gas", name: "Oil & Gas", confirm: false },
  { id: "refining", name: "Refining", confirm: false },
  { id: "power", name: "Power", confirm: false },
  { id: "cement", name: "Cement", confirm: true },
] as const;
export const sectors: string[] = sectorData.map(sector => sector.name);
export const navLinks = [
  "About",
  "Services",
  "Sectors",
  "Projects",
  "QHSE",
  "Insights",
  "Careers",
].map((label) => ({ label, href: `/${label.toLowerCase()}` }));
navLinks.unshift({ label: "Home", href: "/" });
export const secondaryLinks = [
  { label: "Conduct", href: "/conduct" },
  { label: "Become a Vendor", href: "/vendors" },
  { label: "Contact", href: "/contact" },
];
export const subsidiaries = real.subsidiaries;
export const serviceHref = (name: string) =>
  `/services/${name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-$/, "")}`;
export const sectorSlug = (name: string) => sectorData.find(sector => sector.name === name)?.id ?? name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
export const sectorHref = (name: string) => `/sectors#${sectorSlug(name)}`;
export const sectorDetailHref = (name: string) => `/sectors/${sectorSlug(name)}`;

export const serviceNames = serviceGroups.flatMap((group) => group.services);
export const serviceSlug = (name: string) =>
  serviceHref(name).split("/").pop()!;
