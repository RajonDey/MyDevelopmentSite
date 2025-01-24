// lib/api.ts
const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

if (!WORDPRESS_API_URL) {
  throw new Error("NEXT_PUBLIC_WORDPRESS_API_URL is not defined in .env.local");
}

/**
 * Fetch services from WordPress
 */
export async function getServices(): Promise<Service[]> {
  const res = await fetch(`${WORDPRESS_API_URL}/services`);
  if (!res.ok) {
    throw new Error("Failed to fetch services");
  }
  return res.json();
}

/**
 * Fetch a single service by ID from WordPress
 */
export async function getServiceById(id: number): Promise<Service> {
  const res = await fetch(`${WORDPRESS_API_URL}/services/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch service");
  }
  return res.json();
}

/**
 * Fetch media (image) by ID from WordPress
 */
export async function getMediaById(id: number): Promise<string> {
  const res = await fetch(`${WORDPRESS_API_URL}/media/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch media");
  }
  const data = await res.json();
  return data.source_url; // URL of the image
}

/**
 * Service interface based on WordPress API response
 */
export interface Service {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  featured_media: number; // Featured image ID
  acf: {
    price?: number; // Optional custom fields
  };
}
