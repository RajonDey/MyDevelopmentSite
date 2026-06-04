import Link from "next/link";
import { cn } from "@/lib/utils";

type RdxButtonVariant = "primary" | "secondary" | "ghost" | "link";

type RdxButtonProps = {
  variant?: RdxButtonVariant;
  href?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick">;

const variantStyles: Record<RdxButtonVariant, string> = {
  primary:
    "bg-rdx-accent text-white hover:bg-rdx-accent-hover border border-transparent",
  secondary:
    "border border-rdx-border bg-rdx-paper text-rdx-ink hover:bg-rdx-surface",
  ghost: "text-rdx-muted hover:text-rdx-ink hover:bg-rdx-surface border-transparent",
  link: "text-rdx-accent hover:text-rdx-accent-hover underline-offset-4 hover:underline p-0 h-auto border-transparent bg-transparent",
};

export function RdxButton({
  variant = "primary",
  href,
  className,
  children,
  type = "button",
  onClick,
  ...props
}: RdxButtonProps) {
  const styles = cn(
    "inline-flex items-center justify-center rounded-rdx px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rdx-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    variantStyles[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={styles} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={styles} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
