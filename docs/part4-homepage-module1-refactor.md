# Part 4 Homepage Module 1 Refactor Plan (Anime Overload Wiki)

## Scope
- Update homepage copy and UI for `Anime Overload Wiki`.
- Modify only:
  - `src/app/[locale]/page.tsx`
  - `src/locales/en.json`
- Keep ad components and placements active.
- Keep homepage navigation below video and support in-page smooth scroll to 16 modules.
- Remove homepage internal URL links and keep external links only.

## Constraints
- Do not create a new simplified `page.tsx`; refactor existing file.
- Use `lucide-react` icons through existing icon infrastructure.
- No emoji usage.
- Every homepage navigation card must use a unique icon.
- Use theme variables (`hsl(var(--nav-theme))`, `hsl(var(--nav-theme-light))`, `hsl(var(--gold))`) and avoid hardcoded hex colors.
- Update only English locale copy.
- FAQ content must explicitly include `Anime Overload Wiki`.

## Data Sources Used
- `/root/Documents/GameProjects/0_meta/animeoverloadwiki_wiki/00基础信息.md`
- `/root/Documents/GameProjects/0_meta/animeoverloadwiki_wiki/00首页信息-1.md`
- `/root/Documents/GameProjects/0_meta/animeoverloadwiki_wiki/00首页信息.md`

## Information Architecture

### Hero + Video
- Keep hero title and KPI stats aligned with Anime Overload release profile.
- Keep official teaser video block.
- Primary external CTAs:
  - Discord
  - Roblox game page

### Navigation Grid (16 cards, unique icons)
1. Anime Overload Wiki Hub
2. Anime Overload Codes
3. Anime Overload Tier List
4. Anime Overload Beginner Guide
5. Anime Overload Traits Guide
6. Anime Overload Heroes
7. Anime Overload Progression Guide
8. Anime Overload Story
9. Anime Overload Raids
10. Anime Overload Summon & Reroll Guide
11. Anime Overload Secret Units
12. Anime Overload Collections
13. Anime Overload Evolution Materials
14. Anime Overload Quest Guide
15. Anime Overload Mounts
16. Anime Overload Update Log

### Section Strategy
- Module 1-4: Use richer subsection content from `00首页信息-1.md`.
- Module 5-16: Use concise but complete cards/tables/timeline copy derived from `00首页信息.md`.
- All module titles use the `Anime Overload Wiki + topic` SEO pattern.

## Copy Rules
- Replace all residual WWE-oriented homepage copy.
- Avoid reliability/disclaimer uncertainty wording in homepage body and FAQ.
- Keep practical tone for player tasks: code redemption, progression priorities, modes, raids, traits, units.

## Visual Strategy
- Keep current visual language but normalize to theme variables.
- Maintain existing animation and reveal behavior.
- Keep section alternation and card hierarchy for readability on desktop and mobile.

## Verification Checklist
1. `git log` confirms prior step committed.
2. Homepage translation keys updated in `src/locales/en.json`.
3. `page.tsx` imports/uses lucide-react and uses `hsl(var(--nav-theme))`.
4. No `WWE 2K26` remains in `src/locales/en.json`.
5. No forbidden reliability words in `src/locales/en.json`.
6. FAQ questions/answers mention `Anime Overload Wiki`.
7. `npm run typecheck`, `npm run lint`, and `npm run build` pass.
8. Local `curl -I /` and `/pt` return HTTP 200 while dev server is running.
9. Commit, push, watch GitHub Actions, then run redeploy script for `animeoverloadwiki.wiki`.

## Decision Notes
- Requested `/frontend-design` skill is not available in current skill list; implementation will follow existing project design system and theme tokens directly.
