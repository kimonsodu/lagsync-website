# Astro Website Review (Fallback)

`OPENAI_API_KEY` is not set, so this report was generated without an LLM run.

## 1. Architecture Problems
- Add shared content collections or JSON/YAML data files for repeated browser/store metadata instead of hardcoding URLs in multiple components.
- Keep route-level SEO metadata centralized via a helper to avoid drift between pages.

## 2. TypeScript/Astro Issues
- Ensure strict TypeScript settings are enabled and avoid `any` in config/content helpers.
- Validate dynamic route params in `src/pages/fix/[site].astro` and handle unknown `site` values with an explicit fallback.

## 3. Performance Improvements
- Confirm images under `public/images` are optimized (compressed and right-sized).
- Use lazy loading for non-critical sections and images where appropriate.

## 4. Component Design Improvements
- Move repeated CTA logic into a reusable component or utility.
- Keep browser-detection and install-link selection in a small utility function to improve testability.

## 5. Concrete Refactoring Suggestions
- Create a typed `browserTargets` config object and render install links from data.
- Add a lightweight lint/check step in CI for Astro + TypeScript formatting and consistency.
- Add a simple smoke check script to verify critical pages and links.
