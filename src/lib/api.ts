// lib/api.ts

// Use a fallback URL or make it optional
const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || null;

// Mock data (you can move this to mock-data.ts later if you prefer)
const mockServices: Service[] = [
  {
    id: 1,
    title: { rendered: "Web Development" },
    excerpt: { rendered: "Custom web development services." },
    featured_media: 101,
    acf: { price: 500 },
  },
  {
    id: 2,
    title: { rendered: "UI/UX Design" },
    excerpt: { rendered: "Beautiful and functional designs." },
    featured_media: 102,
    acf: { price: 300 },
  },
];

const mockMedia: Record<number, string> = {
  101: "/images/web-dev.jpg",
  102: "/images/ui-ux.jpg",
};

/**
 * Fetch services (mock or real based on environment)
 */
export async function getServices(): Promise<Service[]> {
  if (!WORDPRESS_API_URL) {
    // Return mock data if no API URL is set
    return Promise.resolve(mockServices);
  }

  const res = await fetch(`${WORDPRESS_API_URL}/services`);
  if (!res.ok) {
    throw new Error("Failed to fetch services");
  }
  return res.json();
}

/**
 * Fetch a single service by ID (mock or real)
 */
export async function getServiceById(id: number): Promise<Service> {
  if (!WORDPRESS_API_URL) {
    const service = mockServices.find((s) => s.id === id);
    if (!service) {
      throw new Error("Service not found");
    }
    return Promise.resolve(service);
  }

  const res = await fetch(`${WORDPRESS_API_URL}/services/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch service");
  }
  return res.json();
}

/**
 * Fetch media (image) by ID (mock or real)
 */
export async function getMediaById(id: number): Promise<string> {
  if (!WORDPRESS_API_URL) {
    return Promise.resolve(mockMedia[id] || "/placeholder.svg");
  }

  const res = await fetch(`${WORDPRESS_API_URL}/media/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch media");
  }
  const data = await res.json();
  return data.source_url;
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
  featured_media: number;
  acf: {
    price?: number;
  };
}
