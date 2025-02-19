export interface Service {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  featured_media: number; // Featured image ID
  acf: {
    price?: number; // Optional custom fields
    faqs?: { question: string; answer: string }[];
    features?: string[];
    platforms?: string[];
    technologies?: string[];
  };
}
