export interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  content: { rendered: string };
  featured_media?: number;
  link: string;
  image?: string;
  categories?: string[];
}
