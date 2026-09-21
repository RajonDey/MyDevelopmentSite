# 00 — Spec-driven workflow

**Status:** Done  
**Product:** shared  
**Approved by:** founder (20 Sep 2026 session)  
**Date:** 20 Sep 2026

## Problem

The repo has three products and many docs. Agents were loading the whole `docs/` hub every session, mixing products, and implementing before the work was scoped.

## Goal

- `context/` holds how the system works.
- `plot.md` tells the agent which files to open for a job.
- `specs/` holds numbered feature specs. Draft specs are not implemented.
- `docs/` is the short human + locked-product shelf.

## Out of scope

- Implementing OS data layer or launch F
- Splitting the git repo
- Changing product behavior

## Context to read

- `context/*`
- `plot.md`
- `docs/PRODUCTS.md`

## Files touched

- `context/*`, `plot.md`, `specs/*`
- `AGENTS.md`, `CLAUDE.md`, `.cursor/rules/*`, `.agents/skills/rdx-revamp/SKILL.md`
- Slim `docs/README.md`; absorb process docs into context

## Steps

1. Fill context templates from the live product map.
2. Add plot + spec template.
3. Point agents at plot-first.
4. Remove process markdown that now lives in `context/`.

## Verify

- A new-feature prompt would stop at a Draft spec.
- A marketing prompt would not open OS folders.
- `docs/` index lists only human/locked files.
