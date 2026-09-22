# DatePilot Project Decisions

## 2026-09-20

- Use a Vite React TypeScript application for the first implementation.
- Keep internal planning files under `internal/`; production output must not expose them.
- Use browser-side calculations for the initial tools, with logic separated from presentation.
- Treat approximately 30 useful pages as an information-architecture target, never as a thin-content quota.
- Count 30 main useful/indexable pages separately from trust, legal, support, and technical pages. The main set uses `/calculators`, `/calendar`, `/time`, `/guides`, and `/faq`.
- Keep Privacy Policy, Cookie Policy, Terms, Disclaimer, Contact, About, and Report an Error available in addition to the 30 main pages.
- Do not implement advertising behavior until the core product and content are reviewed.
- Use `internal/docs/KEYWORD-RESEARCH.md` as the source of truth for researched SEO opportunities; unknown metrics must not be invented.
- Create the smallest number of pages needed to satisfy distinct search intents; consolidate synonymous queries to avoid cannibalization.
