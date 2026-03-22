# Part 8 Refactor Plan: Translation & SEO Hardening

Date: 2026-03-22
Project: Anime Overload Wiki
Scope: Multi-language translation pipeline + SEO consistency cleanup

## Goals

1. Complete multilingual locale refresh based on latest `src/locales/en.json`.
2. Eliminate legacy brand leftovers (especially `WWE 2K26`) from localized JSON outputs.
3. Apply SEO consistency checks from template:
   - link consistency
   - legacy brand residue
   - loading placeholder text
   - H1/page-topic semantics
   - internal-link/site-structure completeness
4. Keep homepage ad components and existing architecture intact.

## Baseline Checks

- Previous step commit exists: `c4c047e` (`Part 7 Homepage Module 4`).
- Working tree has one pre-existing uncommitted log file change:
  - `batch-dispatch-20260322_113429.log`
- SEO template reviewed: `templates/template1/seo-check.md`.

## Issues Found Before Changes

1. Homepage loading placeholder is hardcoded as `Loading...` in `src/app/[locale]/page.tsx`.
2. Homepage legal section currently renders plain text entries instead of internal links, reducing internal-link completeness.
3. Locale files (e.g. `fr/de/ja`) still contain many `WWE 2K26` legacy strings.
4. Prompt-specified translation script path is outdated (`translate-messages.py` missing); repository provides `translate-messages-enhanced.py`.

## Refactor Actions

1. Homepage SEO polish
   - Localize loading placeholder text via i18n key in `common`.
   - Convert homepage legal entries to clickable internal links (`/about`, `/privacy-policy`, `/terms-of-service`, `/copyright`) with locale-aware pathing.
2. Translation pipeline update
   - Update `tools/articles/modules/transpage/transpage_config.json` with provided API credentials and model endpoint.
   - Run translation generation using available script `translate-messages-enhanced.py --overwrite`.
3. Validation
   - Locale file existence, size/line sanity, tail checks.
   - Dev server boot + route probes (`/`, `/pt`).
   - Residual keyword check (`WWE 2K26`).
   - typecheck/lint/build.
4. Delivery
   - Git add/commit/push.
   - Check GitHub Actions via `gh`.
   - Run redeploy script.
   - Final cleanup `rm -rf .next`.

## Risk Controls

- Do not remove ad components from homepage.
- Keep edits minimal and focused on required files.
- Preserve existing locale routing (`as-needed`) and default locale behavior.
- If API call limits affect translation script, retry with built-in retry strategy and document outcome.
