# SEO & AI discoverability — RDX Technologies

How the site is optimized for **Google Search** and **AI answer engines** (ChatGPT, Perplexity, Claude, Google AI Overviews).

---

## What was implemented

| Layer | Purpose |
|-------|---------|
| **`/sitemap.xml`** | RDX routes only (replaced legacy mock sitemap) |
| **`/robots.txt`** | Allows Google + AI crawlers; blocks admin/auth/thank-you |
| **`/llms.txt`** | Short machine-readable site summary for LLM crawlers |
| **`/llms-full.txt`** | Extended FAQ + positioning for AI citations |
| **JSON-LD `@graph`** | Organization + WebSite + ProfessionalService on every page |
| **FAQPage schema** | `/faq` + `/services` |
| **Service + Offer schema** | Each service detail page with USD tier prices |
| **BreadcrumbList** | Service detail pages |
| **Meta keywords** | Root layout — agency website, HubSpot, CRM automation, etc. |
| **`/faq` rewrite** | RDX copy + schema (replaced legacy freelancer FAQ) |

---

## AI crawler access

Explicitly allowed in `src/app/robots.ts`:

- `GPTBot` (OpenAI)
- `ChatGPT-User`
- `ClaudeBot` / `anthropic-ai`
- `PerplexityBot`
- `Google-Extended` (Gemini training opt-in)

Campaign lander `/for-agencies` stays **noindex** but is not blocked for all bots — adjust if you want it fully private.

---

## Google Search Console setup (you)

1. Verify property: `https://development.rajondey.com`
2. Submit sitemap: `https://development.rajondey.com/sitemap.xml`
3. Request indexing for:
   - `/`
   - `/services`
   - `/services/agency-website`
   - `/services/lead-automation`
   - `/start`
   - `/faq`
4. Monitor **Pages** + **Enhancements → FAQ** after crawl

---

## Content tips for AI citations

AI tools prefer **clear, factual, citable statements**. Already on site:

- Public tier pricing in plain text (not images)
- FAQ with direct Q&A format
- Service subtitles stating integrations (HubSpot, Slack, Calendly)
- Case study outcomes without inflated metrics

**Improve over time:**

- Real case study screenshots (replace BrowserFrame placeholders)
- 2–4 blog posts targeting “agency website HubSpot”, “marketing agency CRM automation”
- Add `sameAs` URLs in schema when you have LinkedIn/company profiles

---

## llms.txt usage

Share with partners or link in email footers for AI-aware audiences:

```
https://development.rajondey.com/llms.txt
```

Regenerated from `src/content/rdx/seo.ts` — update that file when pricing or services change.

---

## Code map

| File | Role |
|------|------|
| `src/content/rdx/seo.ts` | Keywords, FAQ, sitemap routes, llms.txt builder |
| `src/lib/seo/schema.ts` | JSON-LD builders |
| `src/components/rdx/seo/JsonLd.tsx` | Renders `<script type="application/ld+json">` |
| `src/app/sitemap.ts` | Next.js sitemap |
| `src/app/robots.ts` | Next.js robots |
| `src/app/llms.txt/route.ts` | Short LLM summary |
| `src/app/llms-full.txt/route.ts` | Extended LLM summary |

---

## Verify locally

```bash
npm run build && npm run start
curl -s http://localhost:3000/sitemap.xml | head
curl -s http://localhost:3000/robots.txt
curl -s http://localhost:3000/llms.txt | head
```

Test structured data: [Google Rich Results Test](https://search.google.com/test/rich-results)

---

*June 2026*
