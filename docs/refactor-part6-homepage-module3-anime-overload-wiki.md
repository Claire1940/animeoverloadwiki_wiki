# Refactor Plan - Part 6 Homepage Module 3 (Anime Overload Wiki)

## Scope
- Project: `animeoverloadwiki_wiki`
- Required files:
  - `src/locales/en.json`
  - `src/app/[locale]/page.tsx`
- Source requirements:
  - `00基础信息.md`
  - `00首页信息-3.md`

## Objective
Implement homepage modules 9-13 from `00首页信息-3.md` on top of the existing homepage architecture, while preserving existing ad components and section flow.

## Hard Constraints
1. Only edit the existing `src/app/[locale]/page.tsx`; do not create a replacement page.
2. Keep all ad components and ad injection logic intact.
3. Update English locale only.
4. Keep SEO naming format as `Anime Overload Wiki + Topic`.
5. Use `lucide-react` icon names through existing `DynamicIcon` usage.
6. Keep theme color usage based on CSS variables already used by homepage styles.
7. Avoid banned wording (`reliability`, `unverified`, `disputed`, `tough`).

## Content Mapping (Modules 9-13)
From `00首页信息-3.md`, map each module into existing homepage data schema:
- `sectionId`
- `title`
- `subtitle`
- `intro`
- `cards` (section title + section content + focused tags)

Target modules:
1. `anime-overload-raids`
2. `anime-overload-summon-reroll`
3. `anime-overload-secret-units`
4. `anime-overload-collections`
5. `anime-overload-evolution-materials`

## Navigation Update Strategy
Update tool cards under the video section for the five target modules:
- keep section anchors unchanged
- refresh descriptions to match the new module details
- keep icon uniqueness across cards

## UI Refactor in `page.tsx`
Current card renderer supports title/description/tags.
Add optional icon rendering for module cards to satisfy iconized card presentation with `DynamicIcon`:
- extend `ModuleItem.cards` type to include optional `icon`
- render icon block only when icon exists
- preserve current layout and theme variable styling

## Verification Plan
1. `npm run typecheck`
2. `npm run lint`
3. `npm run build`
4. Start dev server and run:
   - `curl -I /`
   - `curl -I /pt`
5. Content checks:
   - grep homepage keys count
   - grep `Anime Overload Wiki` occurrences
   - grep banned words (must return no matches)

## Risk Controls
- Avoid touching unrelated modules (1-8 and 14+).
- Keep JSON schema valid and maintain existing translation structure.
- Do not alter ad config keys or ad placement calls.
