/**
 * Types for service offerings
 */

import { FAQ } from "../faq/faq";

// WordPress API service type
export interface WPService {
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

// Enhanced service type used in the application
export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  iconName: string;
  image: string;
  features: string[];
  platforms: string[];
  technologies: string[];
  isRecommended: boolean;
  benefits: string[];
  expectedOutcome: string;
  faqs: FAQ[];
  metaTitle: string;
  metaDescription: string;
}
