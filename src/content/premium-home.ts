import { homeDifference, homeWhyChoose } from "@/content/home-sections";

export const trustSignals = [
  { label: "Complimentary virtual consult", detail: "Start from home" },
  { label: "Board-certified surgeon network", detail: "Vetted partners" },
  { label: "Transparent pricing guidance", detail: "No surprise fees" },
  { label: "Concierge through recovery", detail: "Before & after surgery" },
];

export const conciergeSteps = [
  {
    step: "01",
    title: "Tell us your goals",
    body: "Share what you want to change and what matters most—timeline, budget, and comfort level—in a relaxed virtual conversation.",
  },
  {
    step: "02",
    title: "Get a personalized plan",
    body: "We match you with procedure options and trusted surgeons aligned with your anatomy, lifestyle, and desired outcome.",
  },
  {
    step: "03",
    title: "Coordinate with confidence",
    body: "Financing, travel, and scheduling support so you know exactly what happens next—especially if you're visiting Tampa Bay.",
  },
  {
    step: "04",
    title: "Recover with support",
    body: "Recovery resources and concierge follow-up so you're never guessing during healing.",
  },
];

export const procedureCategories = [
  { id: "all", label: "All procedures" },
  { id: "body", label: "Body contouring" },
  { id: "breast", label: "Breast" },
  { id: "face", label: "Face & neck" },
  { id: "men", label: "Men" },
] as const;

export type ProcedureCategoryId = (typeof procedureCategories)[number]["id"];

export { homeDifference, homeWhyChoose };
