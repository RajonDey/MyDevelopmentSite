import { RdxContainer } from "@/components/rdx/layout/Container";
import { RdxSection } from "@/components/rdx/layout/Section";
import { SectionHeader } from "@/components/rdx/ui/SectionHeader";
import type { BrandBook } from "@/types/rdx/brand-book";

type BrandHqProductsProps = {
  brand: BrandBook;
};

export function BrandHqProducts({ brand }: BrandHqProductsProps) {
  const rules = brand.productBrand;

  return (
    <RdxSection id="products" className="scroll-mt-32">
      <RdxContainer>
        <SectionHeader
          eyebrow="07"
          title="Products"
          description={`Children of ${rules.parent}. ${rules.footerCredit} on product footers.`}
        />
        <ul className="mt-10 max-w-xl divide-y divide-rdx-border border-y border-rdx-border">
          {brand.products.map((product) => (
            <li key={product.id} className="py-5">
              <p className="font-rdx-display text-[length:var(--rdx-text-xl)] text-rdx-ink">
                {product.name}
              </p>
              <p className="mt-2 text-sm text-rdx-muted">
                {product.status} · accent {product.accent} · {product.credit}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-10 max-w-3xl space-y-4 text-sm leading-[var(--rdx-leading-body)] text-rdx-muted">
          <p>{rules.parentMark}</p>
          <p>{rules.childAccent}</p>
          <p>{rules.legal}</p>
        </div>
        <div className="mt-8 max-w-3xl">
          <h3 className="text-xs uppercase tracking-[0.12em] text-rdx-subtle">
            Future product
          </h3>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-rdx-ink">
            {rules.futureChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
      </RdxContainer>
    </RdxSection>
  );
}
