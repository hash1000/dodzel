// All unfinished editorial content lives here. Replace only with client-approved facts.
const pending = <T extends object>(item: T): T & { todo: true } => ({
  ...item,
  todo: true,
});
export const placeholders = {
  headings: {
    services: pending({
      eyebrow: "01 / Our capabilities",
      title: "Every stage. One partner.",
    }),
    sectors: pending({
      eyebrow: "02 / Industries we serve",
      title: "Built for essential industries.",
    }),
    process: pending({
      eyebrow: "03 / How we work",
      title: "From first drawing to final handover.",
    }),
    projects: pending({
      eyebrow: "04 / Selected work",
      title: "Projects with purpose.",
    }),
    insights: pending({
      eyebrow: "06 / Insights",
      title: "Perspectives from the field.",
    }),
    presence: pending({
      eyebrow: "07 / Our presence",
      title: "Regional reach. Local understanding.",
    }),
  },
  unconfirmedServices: [
    "Engineering",
    "Procurement & Supply Chain",
    "Project Management",
  ].map((name) =>
    pending({
      name,
      description: "Confirm this service and provide an approved description.",
      confirm: true,
    }),
  ),
  rfqServiceReview: pending({
    text: "Engineering, Procurement & Supply Chain, and Project Management require client confirmation.",
    confirm: true,
  }),
  belgrassMerger: pending({
    question:
      "Is Belgrass merging into Dodzel? Please confirm its current name, status and website.",
  }),
  safetyChart: pending({
    label: "Safety trend data pending — no values plotted",
  }),
  insightFilters: ["All insights", "Category pending"].map((label) =>
    pending({ label }),
  ),
  og: pending({ label: "Social preview artwork awaiting approval" }),
  brand: pending({
    text: "DE",
    note: "Temporary typographic mark; replace with approved logo.",
  }),
  media: pending({
    src: "/media-placeholder.svg",
    alt: "Abstract grid marking a reserved industrial media area",
    label: "Industrial media / awaiting assets",
  }),
  hero: [
    pending({
      category: "Engineering · Procurement · Construction",
      headline: "Built on precision.\nDriven by purpose.",
      description:
        "Engineering and industrial construction across Pakistan and the Gulf.",
      cta: "Explore our services",
      href: "/services",
    }),
    pending({
      category: "From plan to plant",
      headline: "One vision.\nEvery stage.",
      description: "A connected approach to complex industrial projects.",
      cta: "How we work",
      href: "#how-we-work",
    }),
    pending({
      category: "Your next project",
      headline: "Let’s build\nwhat’s next.",
      description: "Start a conversation about your project requirements.",
      cta: "Request a Quote",
      href: "/request-a-quote",
    }),
  ],
  stats: [
    "Years of experience",
    "Projects delivered",
    "People in our team",
    "LTI-free man-hours",
  ].map((label) =>
    pending({ value: "—", label, numericValue: null as number | null }),
  ),
  services: pending({
    description:
      "A connected capability, from initial planning to ongoing plant services.",
  }),
  sector: pending({
    description: "Specialist capabilities for essential industries.",
  }),
  oilGasSubitems: ["Upstream", "Midstream", "Refining"].map((title) =>
    pending({ title, confirm: title === "Upstream" || title === "Midstream" }),
  ),
  steps: ["Engineer", "Procure", "Fabricate", "Construct", "Commission"].map(
    (title) =>
      pending({
        title,
        description: "Client-approved process description to be added.",
      }),
  ),
  projects: [1, 2, 3].map((id) =>
    pending({
      id,
      title: `Project ${String(id).padStart(2, "0")} — awaiting details`,
      sector: "Sector pending",
      country: "Country pending",
      scope: "Scope pending",
      client: "Client pending",
      year: "Year pending",
    }),
  ),
  qhse: pending({
    title: "Zero Harm",
    description:
      "Client-approved safety commitment and QHSE policy to be added.",
    hours: "—",
    hoursLabel: "Verified LTI-free man-hours pending",
  }),
  certifications: [1, 2, 3].map((id) =>
    pending({
      title: `Certification slot ${id}`,
      detail: "Standard and validity pending",
    }),
  ),
  insights: [1, 2, 3].map((id) =>
    pending({
      id,
      title: `Insight ${String(id).padStart(2, "0")} — editorial content pending`,
      category: "Category pending",
      date: "Publication date pending",
    }),
  ),
  presence: pending({
    mapLabel: "Indicative map",
    description:
      "Indicative geography only. Office addresses and entity details require confirmation.",
  }),
  careers: pending({
    title: "Build your future with us.",
    description:
      "Careers introduction and current opportunities to be provided.",
  }),
  closing: pending({
    title: "Let’s build what’s next",
    description: "Tell us what you have in mind. Let’s find the way forward.",
  }),
  contact: pending({
    email: "Email address pending",
    phone: "Phone number pending",
    address: "Office address pending",
  }),
  legal: pending({
    text: "Legal notices and privacy policy pending client review.",
  }),
  stub: pending({
    body: "This page is reserved for client-approved content. Details will be added in the next phase.",
  }),
  rfq: pending({
    notice:
      "Structure preview: this form validates your request but does not send or store it.",
    success:
      "Validation complete. This preview has not sent your request. Delivery will be connected in the next phase.",
  }),
};
