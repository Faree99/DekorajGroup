export const company = {
  name: "Dekoraj Group",
  tagline: "Building the infrastructure behind modern agriculture.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};

export const solutions = [
  {
    slug: "poultry-infrastructure",
    title: "Poultry infrastructure",
    short: "Poultry farms",
    image: "/images/farm-exterior.webp",
    number: "01",
    intro: "Built around the birds. Engineered around your ambition.",
    description:
      "Commercial poultry houses that connect capacity planning, housing, equipment and operational flow.",
    scope: [
      "Site assessment & master planning",
      "Poultry house construction",
      "Feed & water integration",
      "Ventilation & power planning",
      "Biosecurity & commissioning",
    ],
    capacity: "Capacity-led design",
  },
  {
    slug: "layer-and-broiler-systems",
    title: "Layer & broiler systems",
    short: "Layer & broiler farms",
    image: "/images/chicks.webp",
    number: "02",
    intro: "Every component. One productive system.",
    description:
      "Housing, feeding, drinking and handling systems planned together for the demands of daily production.",
    scope: [
      "Layer cage systems",
      "Broiler house setup",
      "Automatic feeding systems",
      "Water distribution",
      "Equipment installation & training",
    ],
    capacity: "Integrated automation",
  },
  {
    slug: "fish-and-livestock",
    title: "Fish & livestock facilities",
    short: "Fish & livestock farms",
    image: "/images/fields.webp",
    number: "03",
    intro: "Good farming starts below the surface.",
    description:
      "Purpose-built facilities shaped by the species, site, water needs and operating model of your project.",
    scope: [
      "Feasibility & site planning",
      "Pond & livestock housing layouts",
      "Water systems",
      "Storage & service areas",
      "Project coordination",
    ],
    capacity: "Site-specific planning",
  },
  {
    slug: "cold-storage",
    title: "Cold-chain infrastructure",
    short: "Cold storage",
    image: "/images/farm-exterior.webp",
    number: "04",
    intro: "Protect the value of everything you grow.",
    description:
      "Cold-room and storage projects planned around produce, throughput and the reliability your operation needs.",
    scope: [
      "Storage capacity assessment",
      "Temperature requirements",
      "Cold-room layout",
      "Equipment specification",
      "Installation coordination",
    ],
    capacity: "Product-led specification",
  },
  {
    slug: "processing-and-warehouses",
    title: "Processing & warehouses",
    short: "Processing facilities",
    image: "/images/cage-system.webp",
    number: "05",
    intro: "Create the next link in your value chain.",
    description:
      "Processing facilities and agricultural warehouses that connect production to handling, storage and distribution.",
    scope: [
      "Operational flow planning",
      "Facility & service layouts",
      "Equipment selection",
      "Warehouse development",
      "Commissioning support",
    ],
    capacity: "Operational flow",
  },
  {
    slug: "custom-development",
    title: "Complete farm development",
    short: "Custom farm projects",
    image: "/images/fields.webp",
    number: "06",
    intro: "From the first hectare to what comes next.",
    description:
      "A coordinated route from early ideas and site assessment to infrastructure, installation and a working operation.",
    scope: [
      "Project definition",
      "Master planning",
      "Design & quotation",
      "Construction & installation",
      "Handover & growth planning",
    ],
    capacity: "End-to-end development",
  },
] as const;

export const products = [
  {
    slug: "layer-cage-system",
    title: "Layer cage system",
    category: "Cages",
    image: "/images/cage-system.webp",
    description:
      "Modular galvanized housing for commercial layer operations. Final configuration depends on bird capacity, site and production needs.",
    features: [
      "Galvanized steel construction",
      "Modular configuration",
      "Feeding-system compatibility",
    ],
    price: null,
    availability: "Confirm availability",
  },
  {
    slug: "poultry-transport-crates",
    title: "Poultry transport crates",
    category: "Handling",
    image: "/images/crates.webp",
    description:
      "Ventilated handling crates for poultry transport. Ask for available dimensions, colours and quantity pricing.",
    features: [
      "Ventilated construction",
      "Stackable format",
      "Quantity-based quotation",
    ],
    price: null,
    availability: "Confirm availability",
  },
  {
    slug: "automated-feeding-system",
    title: "Automated feeding system",
    category: "Feeders",
    image: "/images/poultry-interior.webp",
    description:
      "A coordinated feeding setup specified to the house layout and operating capacity of your poultry project.",
    features: [
      "House-specific layout",
      "Capacity-led specification",
      "Installation enquiry available",
    ],
    price: null,
    availability: "Made to specification",
  },
  {
    slug: "drinking-system",
    title: "Poultry drinking system",
    category: "Drinkers",
    image: "/images/chicks.webp",
    description:
      "Water distribution and drinking components for poultry houses. Get a specification matched to your production setup.",
    features: [
      "Water distribution planning",
      "Equipment compatibility review",
      "System supply enquiry",
    ],
    price: null,
    availability: "Confirm availability",
  },
] as const;

export const productCategories = [
  "All equipment",
  "Cages",
  "Feeders",
  "Drinkers",
  "Handling",
  "Farm Machinery",
  "Processing Equipment",
  "Cold Storage Equipment",
  "General Farming Equipment",
];
export const consultationTypes = [
  {
    id: "online",
    label: "Online consultation",
    note: "A focused conversation, wherever you are.",
    duration: "Duration confirmed with your quotation",
    icon: "01",
  },
  {
    id: "office",
    label: "Office consultation",
    note: "Bring your plans. Work through the details.",
    duration: "Duration confirmed with your quotation",
    icon: "02",
  },
  {
    id: "site",
    label: "Site visitation",
    note: "Understand the possibilities on the ground.",
    duration: "Scoped around your location",
    icon: "03",
  },
] as const;
export const processSteps = [
  [
    "Tell us what you’re building",
    "Share your vision, location and intended scale. We start by understanding the operation you want to create.",
  ],
  [
    "Assessment & consultation",
    "Explore site conditions, production goals and the technical requirements that shape the project.",
  ],
  [
    "Design & quotation",
    "Translate the brief into a clear scope, proposed systems and a project-specific quotation.",
  ],
  [
    "Construction & installation",
    "Bring the structures, services and equipment together through coordinated delivery.",
  ],
  [
    "Commissioning",
    "Check the installed systems and prepare the operation for handover.",
  ],
  [
    "Grow & scale",
    "Plan the next stage around the needs and performance of your operation.",
  ],
] as const;
