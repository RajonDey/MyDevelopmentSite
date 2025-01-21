import type React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export function Button({
  className = "",
  variant = "primary",
  ...props
}: ButtonProps) {
  const baseStyle = "px-4 py-2 rounded-md font-medium transition-colors";
  const variantStyle =
    variant === "primary"
      ? "bg-primary text-background hover:bg-primary/90"
      : "bg-secondary text-background hover:bg-secondary/90";

  return (
    <button
      className={`${baseStyle} ${variantStyle} ${className}`}
      {...props}
    />
  );
}
