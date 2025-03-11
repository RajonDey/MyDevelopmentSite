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
  featured_media: number; 
  acf: {
    price?: number; 
    faqs?: { question: string; answer: string }[];
    features?: string[];
    platforms?: string[];
    technologies?: string[];
  };
}
