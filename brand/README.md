# RDXHIVE brand

Read this folder **before** making a logo, deck, social post, presentation, or a new SaaS.

This is the source of truth. It is **shared infrastructure**, not a fourth product.

## Start here

| File | Who | Job |
|------|-----|-----|
| [BRAND.md](./BRAND.md) | Humans | Brand book (identity locked · spec 03) |
| [brand.json](./brand.json) | Agents / apps | Machine names, tokens, paths |
| [assets.md](./assets.md) | Both | Which file to use, and when |

Program: [`../specs/01-brand-hq-program.md`](../specs/01-brand-hq-program.md).

## Three layers

```text
1. Source of truth     brand/                 this folder
2. Served files        public/brand/          PNG / SVG / ICO only
3. Editorial HQ        /brand                 reads this folder + public/brand
```

Do not invent a second tree. Do not copy hex or fonts into a new app until you have read `brand.json`.

## Rules

1. Public site headlines and CTAs still come from [`../docs/RDX_Content_Copy_Bank.md`](../docs/RDX_Content_Copy_Bank.md).
2. Live CSS tokens stay in `src/styles/rdx/tokens.css`. Hex in `brand.json` matches those tokens (path A). Do not restyle the site from this folder.
3. App code keeps using `src/content/rdx/brand.ts` until a later spec points it at `brand.json`.
4. No secrets here.
5. `TBD` means not locked. Do not fill TBD by guessing.

## Next

`/brand` is live (noindex). Voice and product-brand rules are locked. Templates are spec **08** (parked).
