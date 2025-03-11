interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "text" | "outline";
}

export function Button({
  className = "",
  variant = "primary",
  children,
  ...props
}: ButtonProps) {
  const baseStyle = "px-4 py-2 rounded-md font-medium transition-colors ";
  const variantStyle = {
    primary: "bg-primary text-background hover:bg-primary/90",
    secondary:
      "bg-secondary text-background hover:bg-secondary/90 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.25)]",
    text: "text-secondary hover:text-secondary/90 bg-transparent flex items-center !px-0",
    outline:
      "border border-primary text-primary hover:bg-primary/10 bg-transparent",
  }[variant];

  // Additional style for the text variant with right arrow
  const textWithArrow =
    variant === "text" ? "after:content-['→'] after:ml-1" : "";

  return (
    <button
      className={`${baseStyle} ${variantStyle} ${textWithArrow} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
