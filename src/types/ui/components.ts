/**
 * Types for UI components
 */

import { ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  href?: string;
}

export interface CardProps {
  children: ReactNode;
  className?: string;
  href?: string;
}

export interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "secondary" | "outline" | "green" | "red" | "yellow";
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}
