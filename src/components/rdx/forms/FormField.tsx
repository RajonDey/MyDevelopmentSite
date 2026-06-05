import { cn } from "@/lib/utils";

export const rdxInputClassName =
  "w-full rounded-rdx border border-rdx-border bg-rdx-paper px-3 py-2.5 text-sm text-rdx-ink placeholder:text-rdx-subtle focus:outline-none focus:ring-2 focus:ring-rdx-accent focus:ring-offset-1";

type FormFieldProps = {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
};

export function FormField({
  label,
  htmlFor,
  required,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-rdx-ink">
        {label}
        {required ? " *" : ""}
      </label>
      {children}
    </div>
  );
}
