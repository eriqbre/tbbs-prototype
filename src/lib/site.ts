import site from "@/content/site.json";

export type NavChild = { label: string; href: string };
export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

export const siteConfig = site as {
  main: NavItem[];
  phone: string;
  phoneHref: string;
  email: string;
  consultUrl: string;
  contactUrl: string;
  paymentUrl: string;
  social: { facebook: string; instagram: string };
  brand: string;
  logo: string;
};

export const CONSULT_URL = siteConfig.consultUrl;
export const CONTACT_URL = siteConfig.contactUrl;
