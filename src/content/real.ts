// Legacy site facts retain review flags. Profile facts are sourced from the supplied PDF.
const profileFact = <T extends object>(item: T) => ({
  ...item,
  source: "dodzel-INTRO.pdf, page 1" as const,
  confirm: false as const,
});
const reviewed = <T extends object>(item: T) => ({
  ...item,
  source: "dodzel.com (current site)" as const,
  confirm: true as const,
});
const entities: { name: string; country: string; city?: string; email: string; logo: string; url?: string }[] = [
  { name: "Dodzel Engineering Limited", country: "Pakistan", city: "Lahore", email: "info@dodzel.com", logo: "/assets/images/dodzel-logo.png", url: "https://dodzel.com" },
  { name: "Dodzel Engineering WLL", country: "Qatar", city: "Doha", email: "info@dodzel.com", logo: "/assets/images/dodzel-logo.png" },
  { name: "Belgrass Construction Company", country: "Qatar", email: "info@belgrass.com.qa", logo: "/images/belgrass.jpeg", url: "https://belgrass.com.qa" },
  { name: "Bimex Trading Company", country: "Qatar", email: "info@bimex.com.qa", logo: "/images/bimex.jpeg", url: "https://bimex.com.qa" },
  { name: "Novex Trading Private Limited", country: "Pakistan", email: "novex@novex.com.pk", logo: "/images/novex.jpeg", url: "https://novex.com.pk" },
];
export const real = {
  company: profileFact({
    name: "Dodzel Engineering Limited",
    shortName: "Dodzel Engineering",
    founded: "2020",
    registration: "Public limited company registered with SECP, Pakistan",
    description:
      "Founded in 2020, Dodzel Engineering Limited is a Pakistan-based engineering and construction company delivering reliable, high-quality solutions across the industrial, infrastructure and energy sectors. Registered with the Securities and Exchange Commission of Pakistan (SECP) as a public limited company, Dodzel is developing strategic partnerships and expanding internationally.",
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
  countries: [
    profileFact({ name: "Pakistan", status: "Home market" }),
    profileFact({ name: "Qatar", status: "Group expansion through acquisitions" }),
    profileFact({ name: "Oman", status: "Expansion opportunities" }),
    profileFact({ name: "Iraq", status: "Expansion opportunities" }),
    profileFact({ name: "Saudi Arabia", status: "Expansion opportunities" }),
  ],
  expansion: profileFact({
    title: "Rooted in Pakistan. Growing across the region.",
    description: "Dodzel is pursuing opportunities in Qatar, Oman, Iraq and Saudi Arabia. In Qatar, the acquisition and integration of Belgrass Construction Company and Bimex Trading Company strengthen the group’s local capabilities and broaden its offering.",
    commitment: "By combining engineering expertise with local resources and regional business capabilities, we aim to build long-term client relationships, develop strategic partnerships and deliver sustainable value across Qatar and the wider Middle East.",
  }),
  qatarPortfolio: [
    profileFact({ name: "Belgrass", fullName: "Belgrass Construction Company", logo: "/images/belgrass.jpeg", href: "/about#belgrass", role: "Construction & project execution", description: "Supporting construction, engineering, industrial services and project execution activities in Qatar." }),
    profileFact({ name: "Bimex", fullName: "Bimex Trading Company", logo: "/images/bimex.jpeg", href: "/about#bimex", role: "Imports, procurement & supply", description: "Supporting imports for the group, procurement and supply-related business activities in Qatar." }),
  ],
  entities: entities.map(reviewed),
  subsidiaries: [
    reviewed({
      name: "Belgrass",
      logo: "/images/belgrass.jpeg",
      fullName: "Belgrass Construction Company",
      email: "info@belgrass.com.qa",
      country: "Qatar",
      detail: "Construction · Qatar",
      description:
        "Supporting construction, engineering, industrial services and project execution activities in Qatar.",
      url: "https://belgrass.com.qa",
    }),
    reviewed({
      name: "Bimex",
      logo: "/images/bimex.jpeg",
      fullName: "Bimex Trading Company",
      email: "info@bimex.com.qa",
      country: "Qatar",
      detail: "Supply chain · Qatar",
      description:
        "Supporting imports for the group, procurement and supply-related business activities in Qatar.",
      url: "https://bimex.com.qa",
    }),
    reviewed({
      name: "Novex",
      logo: "/images/novex.jpeg",
      fullName: "Novex Trading Private Limited",
      email: "novex@novex.com.pk",
      country: "Pakistan",
      detail: "Machine technologies · Pakistan",
      description: "Machine technologies for Pakistan.",
      url: "https://novex.com.pk",
    }),
  ],
  services: [
    reviewed({
      name: "Civil & Buildings",
      description:
        "Civil engineering projects delivered nationwide by an experienced construction team.",
    }),
    reviewed({
      name: "Mechanical & Piping",
      description:
        "Mechanical construction with a focus on piping contracting and EPIC delivery.",
    }),
    reviewed({
      name: "Electrical & Instrumentation",
      description:
        "Electrical, instrumentation and telecommunications services for core industrial sectors.",
    }),
    reviewed({
      name: "Structural Steel",
      description:
        "Supply, fabrication and erection of structural steel, e.g. warehouses, workshops and pipe racks.",
    }),
    reviewed({
      name: "Plant Services (Turnaround & Shutdown)",
      description:
        "Turnaround and shutdown execution for major industrial facilities.",
    }),
    reviewed({
      name: "Project Facilities",
      description:
        "Design and construction services for a wide range of project facilities.",
    }),
  ],
  qhse: reviewed({
    title: "Zero Harm",
    description:
      "Our Zero Harm commitment is to protect our people, the public and the environment.",
  }),
  hero: [
    reviewed({
      category: "Engineering services & construction",
      headline: "An Engineering Services & Construction Company.",
      description:
        "Founded in Pakistan in 2020, expanding in Qatar and pursuing opportunities in Oman, Iraq and Saudi Arabia.",
      cta: "Explore our services",
      href: "/services",
    }),
    reviewed({
      category: "Infrastructure",
      headline: "We help you build your infrastructure reliably.",
      description:
        "Civil, Mechanical and Electrical & Instrumentation services for core industrial sectors.",
      cta: "Our capabilities",
      href: "/services",
    }),
    reviewed({
      category: "Quality · Health · Safety · Environment",
      headline: "We help you build your infrastructure reliably.",
      description:
        "A commitment to Zero Harm for employees, the public and the environment.",
      cta: "Our QHSE commitment",
      href: "/qhse",
    }),
  ],
  mission: reviewed({
    title: "Mission",
    description:
      "Our mission is to maintain and strengthen our leading position among construction companies in the region, delivering first-class workmanship on schedule and within budget through expert supervision, stringent quality control and an outstanding safety record.",
  }),
  success: reviewed({
    title: "The key to our success",
    items: [
      "Teamwork",
      "Professionalism",
      "Adaptability",
      "A strong reservoir of expertise and experience",
      "Continuous growth and development",
      "Commitment to Total Quality Management (TQM)",
    ],
  }),
  ceoMessage: reviewed({
    title: "A message from our CEO",
    description:
      "We firmly believe that our success is tied to the quality of our services and client satisfaction. Our management and resources are committed to customer satisfaction. Our primary objective is to eliminate all stress within the construction industry by supplying, delivering and managing projects to ensure high-quality, timely completion, while maintaining a commitment to Zero Harm to employees, the public and the environment.",
  }),
  team: [
    ["Syed Tahir Hussain", "CEO", "/images/team/syed-tahir-hussain.jpeg"],
    ["Syed Mazhar Hussain", "Director Operations", "/images/team/syed-mazhar-hussain.jpeg"],
    ["Syed Sibet-e-Hasnain", "Director of Legal", "/images/team/syed-sibet-e-hasnain.jpeg"],
    ["Shahzad Hussain", "VP Information & Technology", "/images/team/shahzad-hussain.jpeg"],
    ["Mrs. Bushra Shahzad", "Director Human Resource", "/images/team/bushra-shahzad.jpeg"],
  ].map(([name, title, image]) => reviewed({ name, title, image })),
  policies: [
    reviewed({
      title: "Our policy",
      description:
        "Dodzel places significant importance on Quality, Health, Safety, Environment and Security as a matter of principle and policy.",
    }),
    reviewed({
      title: "Health, safety and environment",
      description:
        "Dodzel is committed to safeguarding the health, safety and environment of everyone affected by its operations and minimizing negative impacts on the physical environment where it operates.",
    }),
    reviewed({
      title: "Quality Management",
      description:
        "Dodzel has an independent QA/QC Department. Its head reports directly to the CEO. The department is based at the head office, assigns quality staff to sites and projects, and is supported by top management.",
    }),
  ],
  conduct: reviewed({
    title: "Code of Conduct",
    description:
      "Personnel must comply with company policies, HSE requirements, applicable laws and ethical practices. Harassment, discrimination, violence, theft, fraud, substance abuse, unsafe acts and misuse of company property are prohibited. Everyone must use resources responsibly, protect confidential information and report unsafe conditions or misconduct. Violations may result in disciplinary action.",
  }),
  industries: reviewed({
    description:
      "Services for oil and gas refineries, power plants, commercial infrastructure and the hydrocarbon industry, specializing in Civil, Mechanical and Electrical & Instrumentation.",
  }),
  stats: [
    profileFact({ value: "2020", label: "Founded in Pakistan", numericValue: null }),
    profileFact({ value: "2", label: "Qatar companies acquired and integrated", numericValue: 2 }),
    profileFact({ value: "4", label: "Markets in the regional expansion strategy", numericValue: 4 }),
    profileFact({ value: "SECP", label: "Registered public limited company", numericValue: null }),
  ],
};
