export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
  parent: number;
}

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
  categories?: string[]; // These are category slugs after processing
  category_ids?: number[]; // The original category IDs from WordPress
}
