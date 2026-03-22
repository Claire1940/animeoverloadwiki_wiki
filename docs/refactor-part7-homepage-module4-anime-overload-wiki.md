# Refactor Plan - Part 7 Homepage Module 4 (Anime Overload Wiki)

## Scope
- Project: `animeoverloadwiki_wiki`
- Required files:
  - `src/locales/en.json`
  - `src/app/[locale]/page.tsx`
- Source requirements:
  - `00基础信息.md`
  - `00首页信息-4.md`

## Objective
Implement homepage modules 13-16 from `00首页信息-4.md` in the existing homepage architecture and keep the video-following navigation cards synchronized.

## Hard Constraints
1. Only edit existing `src/app/[locale]/page.tsx`; no replacement page file.
2. Preserve all ad-related components and insertion logic.
3. Update English locale content only.
4. Keep SEO naming in `Anime Overload Wiki + Topic` format.
5. Use `lucide-react` icon names via existing `DynamicIcon` rendering.
6. Use existing theme variables for colors; no hardcoded color literals.
7. Avoid banned words (`reliability`, `unverified`, `disputed`, `tough`).

## Content Mapping (Modules 13-16)
Map each module in `00首页信息-4.md` into the current data schema:
- `sectionId`
- `title`
- `subtitle`
- `intro`
- `cards` with unique icon names per card
- optional `kpis`, `steps`, `codes`, `timeline` where appropriate

Target modules:
1. `anime-overload-evolution-materials`
2. `anime-overload-quest-guide`
3. `anime-overload-mounts`
4. `anime-overload-update-log`

## Navigation Update Strategy
Update the tool cards shown below the video block for the four target modules:
- keep existing anchors
- refresh descriptions to match Part 7 content emphasis
- keep icon names unique for these cards

## UI Strategy in `page.tsx`
- Reuse existing rendering blocks (`kpis`, `cards`, `steps`, `codes`, `timeline`) for new content.
- Keep module card icon rendering through `DynamicIcon`.
- If no new layout primitive is needed, keep `page.tsx` unchanged to minimize risk.

## Verification Plan
1. `npm run dev` and determine `DEV_PORT` from `package.json` (fallback `3000`).
2. `curl -I http://localhost:${DEV_PORT}/`
3. `curl -I http://localhost:${DEV_PORT}/pt`
4. `npm run typecheck`
5. `npm run lint`
6. `rm -rf .next && npm run build`
7. `npm run build 2>&1 | grep -i error` (expect no matches)
8. Content checks:
   - `jq '.homepage' src/locales/en.json | head -50` (or confirm key absence if schema uses top-level sections)
   - grep for forbidden legacy terms and banned words

## Risk Controls
- Do not remove or relocate ad components.
- Maintain valid JSON and existing i18n key structure.
- Keep unchanged modules stable and only refactor target module content.
