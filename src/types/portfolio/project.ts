/**
 * Types for portfolio projects
 */

export interface PortfolioProject {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  client: string;
  completionDate: string;
  features: string[];
  results: string[];
  businessImpact: string;
  liveLink: string;
  githubLink: string;
  metaTitle: string;
  metaDescription: string;
}
