/**
 * Common types used across the application
 */

// SEO metadata types
export interface Metadata {
  title: string;
  description: string;
}

// Static page metadata
export interface StaticPageMetadata {
  [key: string]: Metadata;
}

// Filter types
export interface FilterOption {
  value: string;
  label: string;
}

// Form field types
export interface InputField {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  pattern?: string;
  errorMessage?: string;
}
