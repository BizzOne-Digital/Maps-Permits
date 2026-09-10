export const LEAD_STATUSES = [
  "new",
  "contacted",
  "qualified",
  "closed",
  "archived",
] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const UPLOAD_FOLDERS = ["products", "gallery", "pages", "misc"] as const;
export type UploadFolder = (typeof UPLOAD_FOLDERS)[number];

export const SERVICE_AREA_CITIES = [
  "Brampton",
  "Mississauga",
  "Vaughan",
  "Caledon",
  "Milton",
  "Georgetown",
  "Kitchener",
  "Cambridge",
  "Guelph",
  "London",
  "Waterloo",
  "Oakville",
  "Burlington",
  "Hamilton",
  "Niagara Falls",
  "St. Catharines",
  "Caledonia-Haldimand County",
  "Brantford",
  "Brant County",
  "Orangeville",
  "Barrie",
  "Woodstock",
  "Innisfil",
  "East Gwillimbury",
  "West Gwillimbury",
  "Bradford",
  "Toronto",
  "Ajax",
  "Scarborough",
  "Etobicoke",
  "Whitby",
  "Oshawa",
  "Clarington",
  "Courtice",
  "Petawawa",
  "Markham",
  "Richmond Hill",
  "Stouffville",
];

export const CONTACT_PHONE = "437-777-6887";
export const CONTACT_PHONE_TEL = "4377776887";
export const CONTACT_EMAIL = "maps.permit@gmail.com";
export const SOCIAL_HANDLE = "maps.permits";

export interface FallbackService {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon: string;
  image: string;
  features: string[];
  process: { step: string; title: string; description: string }[];
}

export const FALLBACK_SERVICES: FallbackService[] = [
  {
    title: "Permit Drawings",
    slug: "permit-drawings",
    shortDescription: "Accurate, code-compliant drawings prepared for fast submission.",
    description:
      "We prepare detailed, code-compliant permit drawings for residential and commercial projects, built to satisfy municipal review requirements and keep your submission on track. Our team understands what local building departments across the GTA expect, which helps reduce back-and-forth and delays.",
    icon: "FileText",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
    features: [
      "Code-compliant drafting",
      "Fast-track drawing option",
      "Municipality-specific formatting",
      "Revision support",
    ],
    process: [
      { step: "01", title: "Consultation", description: "We review your project scope and site details." },
      { step: "02", title: "Drafting", description: "Drawings are prepared to meet local code requirements." },
      { step: "03", title: "Review", description: "You review and approve the drawings before submission." },
      { step: "04", title: "Submission", description: "Drawings are packaged and ready for permit application." },
    ],
  },
  {
    title: "Building Permit Applications",
    slug: "building-permit-applications",
    shortDescription: "Complete permit application preparation and municipal submission support.",
    description:
      "From documentation to submission, we help manage the building permit application process so nothing is missed. We coordinate required forms, supporting drawings, and municipal checklists to help your application move through review efficiently.",
    icon: "Stamp",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=80",
    features: [
      "Application checklist management",
      "Municipal submission coordination",
      "Status tracking",
      "Response to city comments",
    ],
    process: [
      { step: "01", title: "Consultation", description: "We confirm what your municipality requires for your project type." },
      { step: "02", title: "Documentation", description: "We assemble the required forms and supporting drawings." },
      { step: "03", title: "Submission", description: "Your application is submitted to the municipality." },
      { step: "04", title: "Follow-up", description: "We help respond to any city comments or requests." },
    ],
  },
  {
    title: "Architectural Drawings",
    slug: "architectural-drawings",
    shortDescription: "Professional architectural drawings for new builds, additions, and renovations.",
    description:
      "Our architectural drawing services cover new construction, additions, renovations, and secondary units — providing clear, buildable plans that support both permit approval and construction. We work closely with clients to translate ideas into accurate technical drawings.",
    icon: "PencilRuler",
    image: "https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=1600&q=80",
    features: [
      "Floor plans & elevations",
      "Structural coordination",
      "Design revisions",
      "Construction-ready detail",
    ],
    process: [
      { step: "01", title: "Consultation", description: "We discuss your vision and project requirements." },
      { step: "02", title: "Concept Drawings", description: "Initial layouts and elevations are prepared." },
      { step: "03", title: "Refinement", description: "Drawings are refined based on your feedback." },
      { step: "04", title: "Final Drawings", description: "Construction-ready drawings are delivered." },
    ],
  },
  {
    title: "Municipal Approval Assistance",
    slug: "municipal-approval-assistance",
    shortDescription: "Guidance and coordination through the municipal approval process.",
    description:
      "Navigating municipal approvals can be confusing. We help clients understand requirements, coordinate submissions, and respond to municipal feedback so approvals move forward with less uncertainty.",
    icon: "Building2",
    image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1600&q=80",
    features: [
      "Requirement guidance",
      "Submission coordination",
      "Municipal liaison support",
      "Timeline tracking",
    ],
    process: [
      { step: "01", title: "Assessment", description: "We assess what approvals your project requires." },
      { step: "02", title: "Coordination", description: "We coordinate the necessary documentation." },
      { step: "03", title: "Submission", description: "Approvals are submitted to the municipality." },
      { step: "04", title: "Approval", description: "We support you through to final approval." },
    ],
  },
  {
    title: "Construction Services",
    slug: "construction-services",
    shortDescription: "Construction support to help move approved projects into progress.",
    description:
      "Once your project is approved, we help support the transition into construction — coordinating documentation, addressing site conditions, and helping keep projects moving from plans to progress.",
    icon: "HardHat",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    features: [
      "Plan-to-construction handoff",
      "Site coordination support",
      "Documentation updates",
      "Progress tracking",
    ],
    process: [
      { step: "01", title: "Handoff", description: "Approved plans are reviewed for construction readiness." },
      { step: "02", title: "Coordination", description: "We help coordinate site and documentation needs." },
      { step: "03", title: "Support", description: "Ongoing support as construction progresses." },
      { step: "04", title: "Completion", description: "Final documentation is wrapped up as the project completes." },
    ],
  },
  {
    title: "Renovation Drawings",
    slug: "renovation-drawings",
    shortDescription: "Drawings for interior and structural renovation projects.",
    description:
      "Renovation projects often require updated drawings for permit purposes, especially when structural or layout changes are involved. We prepare accurate renovation drawings that reflect existing conditions and proposed changes.",
    icon: "Home",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
    features: ["Existing condition drawings", "Proposed layout plans", "Structural notations", "Permit-ready output"],
    process: [
      { step: "01", title: "Site Assessment", description: "We review existing conditions." },
      { step: "02", title: "Drafting", description: "Renovation drawings are prepared." },
      { step: "03", title: "Review", description: "You review the proposed changes." },
      { step: "04", title: "Submission", description: "Drawings are finalized for permit submission." },
    ],
  },
  {
    title: "Addition & Extension Drawings",
    slug: "addition-drawings",
    shortDescription: "Drawings for home additions, extensions, sunrooms, and multi-unit conversions.",
    description:
      "Whether it's a second-storey addition, a rear extension, or a one-season or all-season sunroom, we prepare detailed addition and extension drawings that integrate with your existing structure and meet municipal permit requirements. We also handle bungalow-to-two-storey conversions, and duplex, triplex, and fourplex conversions.",
    icon: "LayoutGrid",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=80",
    features: [
      "House additions & extensions",
      "One-season & all-season sunrooms",
      "Bungalow to 2-storey conversions",
      "Duplex, triplex & fourplex conversions",
      "Permit submission ready",
    ],
    process: [
      { step: "01", title: "Consultation", description: "We review your addition goals and site constraints." },
      { step: "02", title: "Drafting", description: "Addition drawings are prepared to integrate with the existing structure." },
      { step: "03", title: "Review", description: "Drawings are reviewed and refined with you." },
      { step: "04", title: "Submission", description: "Final drawings are prepared for permit application." },
    ],
  },
  {
    title: "Basement & Secondary Unit Drawings",
    slug: "basement-secondary-unit-drawings",
    shortDescription: "Drawings for basement finishing and secondary suite permits.",
    description:
      "Secondary units and finished basements have specific permit requirements around egress, ceiling height, and fire separation. We prepare drawings that address these requirements clearly for municipal review, and help homeowners resolve and remove a Comply to Order Notice tied to unpermitted basement or secondary unit work.",
    icon: "Layers",
    image: "https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=1600&q=80",
    features: [
      "Egress & fire separation detail",
      "Ceiling height verification",
      "Secondary suite compliance",
      "Help to remove Comply to Order Notice",
      "Permit-ready drawings",
    ],
    process: [
      { step: "01", title: "Site Review", description: "We assess the existing basement or unit conditions." },
      { step: "02", title: "Drafting", description: "Drawings are prepared addressing code requirements." },
      { step: "03", title: "Review", description: "Plans are reviewed with you before submission." },
      { step: "04", title: "Submission", description: "Final drawings are submitted for permit review." },
    ],
  },
  {
    title: "Commercial Project Drawings",
    slug: "commercial-project-drawings",
    shortDescription: "Drawings and documentation for commercial projects and change of use permits.",
    description:
      "Commercial projects come with additional layers of review. We prepare commercial drawings, change of use applications, and supporting documentation designed to meet the requirements of municipal and commercial building review processes. Our team has prepared drawings for restaurants, salons, grocery stores, meat shops, retail plazas, doctor clinics, pharmacy stores, retail stores, pizza stores, and other commercial businesses across the GTA and surrounding areas.",
    icon: "Building",
    image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1600&q=80",
    features: ["Change of use applications", "Commercial code compliance", "Multi-stage documentation", "Municipal coordination", "Construction-ready plans"],
    process: [
      { step: "01", title: "Consultation", description: "We review your commercial project scope." },
      { step: "02", title: "Drafting", description: "Commercial drawings are prepared to code." },
      { step: "03", title: "Coordination", description: "Documentation is coordinated with municipal requirements." },
      { step: "04", title: "Submission", description: "Final drawings are submitted for approval." },
    ],
  },
  {
    title: "Property Development Support",
    slug: "property-development-support",
    shortDescription: "End-to-end documentation support for property development projects.",
    description:
      "For developers and investors managing multiple properties, we provide ongoing documentation and permit support to help projects move efficiently from planning through to construction.",
    icon: "ClipboardList",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    features: ["Multi-project coordination", "Documentation management", "Municipal liaison", "Progress reporting"],
    process: [
      { step: "01", title: "Assessment", description: "We review your development portfolio and goals." },
      { step: "02", title: "Planning", description: "We coordinate documentation needs across projects." },
      { step: "03", title: "Execution", description: "Drawings and approvals are managed through to submission." },
      { step: "04", title: "Reporting", description: "Progress is tracked and reported back to you." },
    ],
  },
];

export const FALLBACK_TESTIMONIALS = [
  {
    name: "Michael R.",
    location: "Brampton, ON",
    projectType: "Home Addition",
    rating: 5,
    quote:
      "Maps & Permits made our addition project so much easier. The drawings were accurate and our permit was approved without delays.",
  },
  {
    name: "Sarah T.",
    location: "Mississauga, ON",
    projectType: "Basement Secondary Unit",
    rating: 5,
    quote:
      "They handled our secondary suite drawings and permit application from start to finish. Clear communication throughout the whole process.",
  },
  {
    name: "David L.",
    location: "Vaughan, ON",
    projectType: "New Build",
    rating: 5,
    quote:
      "The 24-hour permit drawing option saved our project timeline. Professional, responsive, and easy to work with.",
  },
  {
    name: "Priya K.",
    location: "Markham, ON",
    projectType: "Commercial Renovation",
    rating: 4,
    quote:
      "Great experience working with the team on our commercial renovation drawings. They understood municipal requirements well.",
  },
  {
    name: "James O.",
    location: "Hamilton, ON",
    projectType: "Change of Use - Restaurant",
    rating: 5,
    quote:
      "We needed a change of use permit to open our restaurant and Maps & Permits handled the entire application. Fast, professional, and they knew exactly what the city needed.",
  },
  {
    name: "Angela F.",
    location: "Kitchener, ON",
    projectType: "Sunroom Addition",
    rating: 5,
    quote:
      "Our all-season sunroom drawings were done quickly and approved on the first submission. Excellent communication from start to finish.",
  },
  {
    name: "Robert C.",
    location: "Barrie, ON",
    projectType: "Comply to Order Notice",
    rating: 5,
    quote:
      "The city issued a comply to order notice on our basement unit and the team helped us resolve it and get properly permitted. Huge relief.",
  },
  {
    name: "Natasha M.",
    location: "Realtor, Oakville, ON",
    projectType: "Realtor Partnership",
    rating: 5,
    quote:
      "As a realtor, I refer Maps & Permits to clients buying homes with addition or basement potential. Their quick turnaround helps my deals close faster.",
  },
];
