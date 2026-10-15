export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  items?: string[];
};

export type LegalDocument = {
  slug: "privacy-policy" | "terms-of-service" | "refund-policy";
  title: string;
  description: string;
  intro: string[];
  sections: LegalSection[];
};
