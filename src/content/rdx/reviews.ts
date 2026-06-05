/** Verified third-party reviews — verbatim quotes only */

export type VerifiedReview = {
  id: string;
  quote: string;
  author: string;
  role?: string;
  platform: "Fiverr" | "Google" | "Upwork" | "Direct";
  platformUrl: string;
  dateLabel?: string;
};

/**
 * Curated for RDX: website + form delivery, professional communication.
 * Excluded: old-site placeholders (Alex Smith / TechCorp), unverified metrics (35% conversion), stats blocks.
 */
export const verifiedReviews: VerifiedReview[] = [
  {
    id: "google-harlig-stad-detailed",
    quote:
      "I'm extremely satisfied with the website created for Härlig Städ AB. The team was professional and responsive and delivered a modern, user-friendly website. The quotation form is smooth, and the whole experience was seamless from start to finish. Highly Recommended.",
    author: "Härlig Städ AB",
    role: "Google review",
    platform: "Google",
    platformUrl:
      "https://www.google.com/maps/place/RDX+Technologies/@24.8999862,91.8610356,13z/data=!3m1!4b1!4m6!3m5!1s0x696622180942f9af:0x4d46f4585e7b071!8m2!3d24.8999862!4d91.8610356!16s%2Fg%2F11m6l43c23?entry=ttu",
    dateLabel: "1 month ago",
  },
  {
    id: "google-harlig-stad-short",
    quote:
      "I'm very satisfied with the website. The design is clean, professional, and exactly what I was looking for. Great communication and support throughout. Highly recommended!",
    author: "Härlig Städ",
    role: "Google review",
    platform: "Google",
    platformUrl:
      "https://www.google.com/maps/place/RDX+Technologies/@24.8999862,91.8610356,13z/data=!3m1!4b1!4m6!3m5!1s0x696622180942f9af:0x4d46f4585e7b071!8m2!3d24.8999862!4d91.8610356!16s%2Fg%2F11m6l43c23?entry=ttu",
    dateLabel: "Recent",
  },
  {
    id: "fiverr-david-wilson",
    quote:
      "Great communication throughout the project. Rajon was quick to implement changes and provided valuable suggestions to improve our site.",
    author: "David W.",
    role: "Founder · Verified on Fiverr",
    platform: "Fiverr",
    platformUrl: "https://www.fiverr.com/rajjohin#Reviews",
    dateLabel: "2 months ago",
  },
];

export const reviewPlatforms = {
  fiverr: {
    label: "Fiverr",
    url: "https://www.fiverr.com/rajjohin#Reviews",
    description: "Verified freelancer reviews",
  },
  google: {
    label: "Google",
    url: "https://www.google.com/maps/place/RDX+Technologies/@24.8999862,91.8610356,13z/data=!3m1!4b1!4m6!3m5!1s0x696622180942f9af:0x4d46f4585e7b071!8m2!3d24.8999862!4d91.8610356!16s%2Fg%2F11m6l43c23?entry=ttu",
    description: "RDX Technologies on Google",
  },
} as const;

export const reviewsContent = {
  eyebrow: "Reviews",
  title: "Verified client feedback",
  description:
    "Google and Fiverr reviews from website and form projects. Verbatim quotes only. Current RDX service tiers are listed on /services.",
  emptyHint:
    "Read verified reviews on Fiverr and Google.",
} as const;
