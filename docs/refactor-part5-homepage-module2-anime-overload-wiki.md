# Anime Overload Wiki 首页重构文档（Part 5 - 模块 2）

## 1. 目标与范围
- 继续首页重构，落地 `00首页信息-2.md` 的模块 5-8：
  - Anime Overload Wiki Traits Guide
  - Anime Overload Wiki Heroes
  - Anime Overload Wiki Progression Guide
  - Anime Overload Wiki Story
- 仅修改：
  - `src/locales/en.json`
  - `src/app/[locale]/page.tsx`（在现有文件基础上增量修改）
- 保留现有广告组件和广告位渲染逻辑，不删除任何广告相关代码。

## 2. 约束与执行策略
- 不创建新的 `page.tsx`，仅在当前实现上增量调整。
- 只更新英文文案，不做翻译扩展。
- 模块命名保持 `Anime Overload Wiki + Topic`（SEO 一致性）。
- 图标采用 `lucide-react`（通过现有 `DynamicIcon` 链路），不使用 emoji。
- 色彩仅使用主题变量，避免硬编码颜色。
- FAQ 保持包含 `Anime Overload Wiki` 主题词。
- 说明：需求提到 `/frontend-design skills`，但当前可用 skill 列表中无该 skill，故按项目既有设计系统与主题变量执行。

## 3. 信息映射（00首页信息-2 -> 首页模块）
- 模块 5 Traits：
  - 强化 Trait 在升级闭环中的定位。
  - 明确资源：Trait Rerolls / Reroll Trait Tickets 与启动奖励（25/100/5）。
  - 纳入 Overload trait（0.1%，Ener (Lightning)）作为 chase 点。
- 模块 6 Heroes：
  - 展示已知 roster（含 base / upgraded forms）。
  - 加入清晰 upgrade paths。
  - 保留 Utility 示例（Inoomaki）和属性 spotlight（Bald Hero）。
- 模块 7 Progression：
  - 增加核心资源清单。
  - 强化主循环：summon -> clear -> upgrade -> quests/raids。
  - 加入早期高效路线（Mythical/Legendaries -> farm Susono from Legend Stage 3）。
- 模块 8 Story：
  - 明确 story 模式定位与价值。
  - 增加已确认奖励词条（Crystal Shard / Red Star(Pure) / Purple Star(Pure)）。
  - 增加玩家追踪重点（stage progress / drops / support materials）。

## 4. UI 与组件改造策略
- 保持现有首页结构：Hero -> Video -> Nav -> Modules -> FAQ -> CTA -> Footer。
- 利用现有 `kpis / cards / columns / steps / timeline / tags` 机制承载模块 5-8 内容。
- 对 `page.tsx` 做轻量增强以提升模块卡片信息密度与风格一致性，不引入新页面文件。

## 5. 验证计划
1. 检查 `git log` 与 `git status`，确认上一步已提交，当前改动可继续。
2. 验证 `en.json` 模块 5-8 文案与 `00首页信息-2.md` 一致。
3. 验证关键词替换与禁用词：`WWE 2K26` / `reliability|unverified|disputed|tough` 不出现。
4. 启动 dev，`curl -I /` 与 `curl -I /pt` 验证 200。
5. 执行 `npm run typecheck`、`npm run lint`、`npm run build`。
6. 完成 git add/commit/push，检查 `gh run list` 与 `gh run watch`。
7. 执行 redeploy 脚本：`/root/.openclaw/skills/wiki-deploy/redeploy-wiki.sh animeoverloadwiki.wiki`。

## 6. 决策说明
- 采用最小侵入方案：核心改动集中在 `en.json` 的模块 5-8，减少对现有渲染层和广告链路的风险。
- 保持 `sectionId` 不变以避免锚点与导航回归问题。
