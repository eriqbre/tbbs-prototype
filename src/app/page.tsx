import type { Metadata } from "next";
import { PremiumHomePage } from "@/components/experience/PremiumHomePage";
import { getHomePage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Tampa Bay Body Sculpting | Cosmetic Surgery, Lipo 360 & Tummy Tuck",
  description:
    "Considering cosmetic surgery in Tampa? Explore Lipo 360, tummy tuck, breast surgery, body contouring, and male body sculpting. Schedule your free consultation.",
};

export default function Page() {
  const page = getHomePage();
  return <PremiumHomePage page={page} />;
}
