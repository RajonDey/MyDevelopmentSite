import { ButtonProps } from "@/types/ui";

export function Button({
  className = "",
  variant = "primary",
  children,
  type = "button",
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  href,
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const baseStyle = "px-4 py-2 rounded-md font-medium transition-colors ";
  const variantStyle = {
    primary: "bg-primary text-background hover:bg-primary/90",
    secondary:
      "bg-secondary text-background hover:bg-secondary/90 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.25)]",
    outline:
      "border border-primary text-primary hover:bg-primary/10 bg-transparent",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
    link: "bg-transparent text-blue-600 hover:underline p-0",
  }[variant || "primary"];

  // We don't use the text variant with arrow anymore

  const widthClass = fullWidth ? "w-full" : "";
  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";
  const loadingClass = loading ? "opacity-80 cursor-wait" : "";

  // If href is provided, render as an anchor tag
  if (href) {
    return (
      <a
        href={href}
        className={`${baseStyle} ${variantStyle} ${widthClass} ${className} inline-block text-center`}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {loading ? "Loading..." : children}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyle} ${variantStyle} ${widthClass} ${disabledClass} ${loadingClass} ${className}`}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
