import { CONTACT_URL, CONSULT_URL } from "@/lib/site";

export const homeAbout = {
  title: "About Tampa Bay Body Sculpting",
  image: {
    src: "/images/blob-d88ea83.png",
    alt: "Male and female Lipo 360 body contouring in Tampa",
  },
  subtitle: "Personalized Cosmetic Surgery Guidance in Tampa Bay",
  paragraphs: [
    {
      text: "At Tampa Bay Body Sculpting, we provide a personalized, concierge approach to cosmetic surgery. Our mission is to help you confidently navigate your transformation with trusted cosmetic surgery providers, individualized recommendations, transparent pricing, and dedicated support from your complimentary consultation through recovery.",
      links: [] as { href: string; text: string }[],
    },
    {
      text: "Whether you're considering Lipo 360, body contouring, a tummy tuck, Brazilian Butt Lift (BBL), breast augmentation, chin and neck liposuction, or male body contouring, we help you understand your options and choose the procedures that best align with your goals. Through our trusted network of experienced, board-certified cosmetic surgeons, we simplify the process so you can focus on achieving natural-looking, confidence-building results.",
      links: [
        { href: "/liposuction-360", text: "Lipo 360" },
        { href: "/tummy-tuck", text: "tummy tuck" },
        { href: "/brazilian-butt-lift-bbl", text: "Brazilian Butt Lift (BBL)" },
      ],
    },
  ],
};

export const homeDifference = {
  title: "The Tampa Bay Body Sculpting Difference",
  introTitle: "Why Patients Choose Tampa Bay Body Sculpting",
  intro:
    "Unlike a traditional cosmetic surgery practice, Tampa Bay Body Sculpting provides a concierge experience that helps you navigate every step of your transformation. We educate, guide, coordinate, and support you throughout the process so you can move forward with confidence.",
  contactHref: CONTACT_URL,
  columns: [
    {
      title: "Personalized Care",
      body: "Every cosmetic surgery journey is unique. We take the time to understand your goals, educate you on your options, and provide personalized recommendations tailored to your body, lifestyle, and desired outcome. From your complimentary virtual consultation through recovery, we're here to guide you every step of the way.",
    },
    {
      title: "Trusted Cosmetic Surgery Network",
      body: "We partner with experienced, board-certified cosmetic surgeons who are known for delivering safe, natural-looking results. Whether you're considering Lipo 360, a tummy tuck, breast surgery, body contouring, or facial procedures, we'll help you find the right approach for your goals with confidence and transparency.",
    },
    {
      title: "Concierge Experience",
      body: "Our concierge approach makes cosmetic surgery simple and stress-free. We provide transparent pricing, financing guidance, travel resources for out-of-town patients, and ongoing support before and after your procedure, ensuring you feel informed, comfortable, and confident throughout your transformation.",
    },
  ],
};

export const homeWhyChoose = {
  title: "Why Patients Choose Tampa Bay Body Sculpting",
  items: [
    {
      title: "Personalized Treatment Planning",
      body: "Every patient receives recommendations tailored to their anatomy, goals, and lifestyle.",
    },
    {
      title: "Trusted Cosmetic Surgery Network",
      body: "We work with experienced cosmetic surgery providers who share our commitment to patient safety and natural-looking results.",
    },
    {
      title: "Complimentary Virtual Consultations",
      body: "Start your journey from the comfort of your home with a personalized consultation.",
    },
    {
      title: "Transparent Pricing",
      body: "Clear procedure information, financing options, and no hidden surprises.",
    },
    {
      title: "Patient Concierge Support",
      body: "We're with you before, during, and after surgery to answer questions and help coordinate your experience.",
    },
    {
      title: "Serving Tampa Bay and Beyond",
      body: "Patients travel from throughout Florida and across the country for cosmetic surgery.",
    },
  ],
};

export const homeProcedures = {
  title: "Popular Cosmetic Surgery Procedures",
  items: [
    {
      title: "Lipo 360",
      href: "/liposuction-360",
      image: "/images/1565629.png",
      imageAlt: "Lipo 360 body contouring results in Tampa",
      body: "Sculpt your waistline with comprehensive circumferential liposuction designed to target stubborn fat around the abdomen, flanks, and back. Lipo 360 creates a smoother, more defined silhouette while enhancing your body's natural contours for balanced, natural-looking results.",
      links: [{ href: "/liposuction-360", text: "Lipo 360" }],
    },
    {
      title: "Tummy Tuck",
      href: "/tummy-tuck",
      image: "/images/blob-56b3a68.png",
      imageAlt: "Woman representing tummy tuck surgery",
      body: "Restore a flatter, firmer abdomen by removing excess skin and tightening weakened abdominal muscles. Whether after pregnancy or significant weight loss, a tummy tuck can dramatically improve your midsection and help you feel more confident in your appearance.",
      links: [{ href: "/tummy-tuck", text: "tummy tuck" }],
    },
    {
      title: "Breast Augmentation",
      href: "/breast-augmentation",
      image: "/images/blob-6c75d85.png",
      imageAlt: "Woman representing breast augmentation",
      body: "Enhance your confidence with breast augmentation tailored to your desired size, shape, and overall proportions. Whether using implants or fat transfer, our trusted cosmetic surgeons help create balanced, natural-looking results that complement your body.",
      links: [
        { href: "/breast-augmentation", text: "implants" },
        { href: "/breast-rejuvenation", text: "fat transfer" },
      ],
    },
    {
      title: "Brazilian Butt Lift",
      href: "/brazilian-butt-lift-bbl",
      image: "/images/blob-2294999.png",
      imageAlt: "Brazilian butt lift BBL",
      body: "Enhance your curves using your body's own fat with a Brazilian Butt Lift. By combining liposuction with fat transfer, a BBL creates fuller, more balanced contours while maintaining a natural appearance.",
      links: [{ href: "/brazilian-butt-lift-bbl", text: "Brazilian Butt Lift" }],
    },
    {
      title: "Chin & Neck Liposuction",
      href: "/female-chin-liposuction",
      image: "/images/blob-4202c05.png",
      imageAlt: "Chin and neck liposuction",
      body: "Refine your profile by removing stubborn fat beneath the chin and along the neck for a more sculpted appearance. Chin and neck liposuction can improve jawline definition and create a slimmer, more youthful facial contour.",
      links: [{ href: "/female-chin-liposuction", text: "Chin and neck liposuction" }],
    },
    {
      title: "Male Body Sculpting",
      href: "/men",
      image: "/images/blob-0773ab0.png",
      imageAlt: "Male body sculpting",
      body: "Designed specifically for men, male body sculpting enhances muscle definition while removing stubborn fat from areas such as the abdomen, chest, flanks, and back. Whether your goal is a leaner physique or a more athletic appearance, personalized treatment options help create natural, masculine contours.",
      links: [{ href: "/men", text: "abdomen, chest, flanks, and back" }],
    },
  ],
};

export const homeTravel = {
  title: "Why Patients Travel to Tampa Bay Body Sculpting for Cosmetic Surgery",
  subtitle: "Patients Visit Us From Across Florida and Beyond",
  body: "Whether you're traveling from Miami, Orlando, Jacksonville, Sarasota, Clearwater, St. Petersburg, or another state, our team helps simplify your experience.",
  bullets: [
    "Virtual consultations",
    "Financing options",
    "Travel planning",
    "Recovery resources",
    "Local accommodations",
    "Follow-up care",
  ],
  image: "/images/shutterstock_359476844_801685051614.JPG",
};

export { CONSULT_URL };
