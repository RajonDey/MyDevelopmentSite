# UI Context

Two visual systems. Do not mix them on the same surface.

## Marketing — Hallmark Quiet

Paper, ink, one teal accent. Not a Vercel clone. Not dark.

Tokens: `src/styles/rdx/tokens.css`. Components: `src/components/rdx/ui/` (`RdxButton`, `RdxCard`, `RdxBadge`).

| Role | CSS variable | Notes |
|------|----------------|-------|
| Page | `--rdx-color-paper` | White |
| Text | `--rdx-color-ink` | Near-black |
| Muted | `--rdx-color-muted` / `--rdx-color-subtle` | Secondary copy |
| Surface | `--rdx-color-surface` | Cards |
| Border | `--rdx-color-border` | Hairlines |
| Accent | `--rdx-color-accent` | Single brand accent |
| Hive ink | `--rdx-hex-ink` | Hex motif only — never on the H mark |

**Type:** Instrument Serif (display) · Source Sans 3 (body).  
**Radius:** `--rdx-radius-sm|md|lg` · pills `--rdx-radius-pill`.  
**Measure:** `--rdx-measure` (65ch). Section padding `--rdx-space-section`.

Layout: `RdxHeader` + `RdxFooter` in root layout. Containers from `rdx/layout/`.

## OS — dark cockpit

`.os-theme` in `src/styles/os/theme.css`. Components: `src/components/os/ui/` (`OsCard`, `OsBadge`, `OsModal`). Do **not** use rdx Button/Card inside `/os` except `RdxLogo`.

| Role | CSS variable |
|------|----------------|
| Page | `--os-color-bg` |
| Surface | `--os-color-surface` / `--os-color-surface-raised` |
| Text | `--os-color-text` / `--os-color-muted` |
| Accent | same rdx accent |
| Health | `--os-color-green` / `--os-color-yellow` / `--os-color-red` |

OS currently covers marketing chrome with a full-viewport overlay. Changing that needs a spec.

## Lead Desk

Uses **rdx** marketing tokens (admin under `rdx/admin/`). Looks like the site, not the OS cockpit. Do not restyle it to match OS.

## Layout patterns

- Marketing: paper page, section stack, sticky CTA on long service/work pages.
- Desk: `/dashboard` list + detail inside `DashboardShell`.
- OS: sidebar + top bar + command center (`OsShell`).

## Icons

Lucide React. Stroke icons. Inline `h-4 w-4`, controls `h-5 w-5`.

## Design skill

New or redesigned marketing pages: `.agents/skills/hallmark/SKILL.md`. No gradient heroes, no 6+ hero pills, no stock-photo collage.
