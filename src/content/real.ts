// Facts supplied in the Phase 3 brief and current-site screenshots.
// Client confirmation is mandatory before publication.
const reviewed = <T extends object>(item: T) => ({
  ...item,
  source: "dodzel.com (current site)" as const,
  confirm: true as const,
});
const entities: { name: string; country: string; url?: string }[] = [
  { name: "Dodzel Engineering Limited", country: "Pakistan", url: "https://dodzel.com" },
  { name: "Novex Trading Company", country: "Pakistan", url: "https://novex.com.pk" },
  { name: "Dodzel Engineering Qatar WLL", country: "Qatar" },
  { name: "Belgrass Construction Company WLL", country: "Qatar", url: "https://belgrass.com.qa" },
  { name: "Bimex Trading Company", country: "Qatar", url: "https://bimex.com.qa" },
];
export const real = {
  company: reviewed({
    name: "Dodzel Engineering Limited",
    shortName: "Dodzel Engineering",
    founded: "2020",
    registration: "Public limited company registered with SECP, Pakistan",
    description:
      "Founded in 2020, Dodzel Engineering Limited is a Pakistan-based public limited company registered with SECP. Its presence includes Saudi Arabia, Qatar and Iraq, and it is expanding into other countries.",
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
  entities: entities.map(reviewed),
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
        "Supply chain services for construction equipment (excavators, forklifts and cranes), piping materials and fittings, and industrial equipment.",
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
        "Founded in Pakistan in 2020, with a presence in Saudi Arabia, Qatar and Iraq.",
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
    ["Syed Tahir Hussain", "CEO"],
    ["Syed Mazhar Hussain", "Director Operations"],
    ["Syed Sibet-e-Hasnain", "Director of Legal"],
    ["Shahzad Hussain", "VP Information & Technology"],
    ["Mrs. Bushra Shahzad", "Director Human Resource"],
  ].map(([name, title]) => reviewed({ name, title })),
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
    reviewed({
      value: "6",
      label: "Years delivering results",
      numericValue: 6,
    }),
    reviewed({
      value: "350+",
      label: "Skilled professionals and certified engineers",
      numericValue: 350,
    }),
    reviewed({
      value: "12+",
      label: "EPIC services and specialized technical solutions",
      numericValue: 12,
    }),
    reviewed({
      value: "0",
      label: "Harm goal under strict HSE standards",
      numericValue: 0,
    }),
  ],
};
