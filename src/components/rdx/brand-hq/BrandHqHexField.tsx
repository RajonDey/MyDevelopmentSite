import { HiveHex } from "@/components/rdx/visuals/hive/HiveHex";
import type { BrandBook } from "@/types/rdx/brand-book";

type BrandHqHexFieldProps = {
  brand: BrandBook;
};

export function BrandHqHexField({ brand }: BrandHqHexFieldProps) {
  const ink = brand.colors.roles.hexInk.hex;

  return (
    <div
      className="grid grid-cols-6 gap-2 sm:grid-cols-8"
      style={{ color: ink }}
      aria-hidden
    >
      {Array.from({ length: 24 }, (_, i) => (
        <HiveHex key={i} filled={i % 5 === 0} className="h-8 w-8 opacity-40" />
      ))}
    </div>
  );
}
