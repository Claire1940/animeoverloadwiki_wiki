# Anime Overload Wiki 首页重构文档（Part 4 - 模块 1）

## 1. 目标与范围
- 主题统一为 `Anime Overload Wiki`。
- 仅修改：
  - `src/locales/en.json`
  - `src/app/[locale]/page.tsx`
- 必须保留现有广告组件与广告位渲染逻辑。
- 首页结构保持：Hero -> 视频模块 -> 导航模块 -> 多个内容模块 -> FAQ -> CTA -> Footer。

## 2. 信息来源与约束
- 需求来源：
  - `/root/Documents/GameProjects/0_meta/animeoverloadwiki_wiki/00基础信息.md`
  - `/root/Documents/GameProjects/0_meta/animeoverloadwiki_wiki/00首页信息-1.md`
  - `/root/Documents/GameProjects/0_meta/animeoverloadwiki_wiki/00首页信息.md`
- 文案只更新英文，不做翻译扩散。
- FAQ 中每条问答必须包含主题名 `Anime Overload Wiki`。
- 删除内部 URL 跳转文案，统一保留并更新外部官方链接（Roblox / Discord / X / YouTube / Reddit）。

## 3. 页面与交互设计方案
- 导航模块保留在视频模块下方，并通过 `scrollToSection` 进行锚点平滑跳转。
- 模块命名规范：`Anime Overload Wiki + xxx`，确保 SEO 一致性。
- 视觉规则：
  - 颜色使用主题变量（如 `hsl(var(--nav-theme))`、`hsl(var(--nav-theme-light))`、`hsl(var(--gold))`）。
  - 图标统一 `lucide-react`，每个导航卡片使用不同图标。
  - 避免硬编码十六进制颜色。
- 响应式保持：桌面 + 移动端均可用。

## 4. 数据与文案策略
- Hero 区域：突出 Roblox 动漫塔防定位与核心玩法（codes / units / traits / raids / progression）。
- 导航与模块：覆盖十几个核心模块，保证可跳转且顺序可扫读。
- FAQ：围绕新手、代码、强度、养成、更新节奏，答案避免不确定性措辞。

## 5. 实施步骤
1. 审查并修正 `en.json` 的模块命名一致性（统一 `Anime Overload Wiki + xxx`）。
2. 审查 `page.tsx` 的组件结构，确认广告、视频、导航、模块和 FAQ 渲染链路完整。
3. 执行静态检查与构建验证。
4. 启动本地服务并用 `curl` 检查 `/` 与 `/pt` 状态码。
5. 执行 git 提交、推送与 gh actions 检查；随后执行 redeploy 脚本。

## 6. 风险与回滚
- 风险：JSON 命名改动导致导航标题与业务词不一致。
- 控制：只修改展示文案，不改 `sectionId`。
- 回滚：可按单文件 git 回滚到改动前状态（必要时）。
