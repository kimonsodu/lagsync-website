"""Run a CrewAI review against this Astro project.

Environment note:
- Default Python environment is the shared uv environment in C:/Users/simon/Documents/dev.
- Do not create a new virtual environment for this script.
- The shared uv environment already has crewai installed.
- Recommended command: uv run python run_agents.py
"""

try:
    from crewai import Agent, Task, Crew
except ModuleNotFoundError as exc:
    raise SystemExit(
        "Missing 'crewai'. Use the shared uv environment in C:/Users/simon/Documents/dev "
        "(do not create a new virtual environment), then run: uv run python run_agents.py"
    ) from exc

import os
from pathlib import Path

# Root of your Astro project
PROJECT_ROOT = Path(__file__).parent

SRC = PROJECT_ROOT / "src"
COMPONENTS = SRC / "components"
PAGES = SRC / "pages"
CONFIG = PROJECT_ROOT / "astro.config.mjs"
TSCONFIG = PROJECT_ROOT / "tsconfig.json"

OUTPUT = PROJECT_ROOT / "review_report.md"


def read_file(path):
    if path.exists():
        return path.read_text(encoding="utf-8")
    return ""


def load_env_file(path):
    if not path.exists():
        return False

    loaded_any = False
    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#"):
            continue

        if line.lower().startswith("export "):
            line = line[7:].strip()

        if "=" not in line:
            continue

        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip().strip('"').strip("'")

        if key and key not in os.environ:
            os.environ[key] = value
            loaded_any = True

    return loaded_any


def load_env_candidates():
    # Check project and parent folders (including .../Documents/dev) for shared .env files.
    candidates = [PROJECT_ROOT / ".env"]
    candidates.extend(parent / ".env" for parent in list(PROJECT_ROOT.parents)[:4])

    seen = set()
    for candidate in candidates:
        if candidate in seen:
            continue
        seen.add(candidate)
        load_env_file(candidate)


def fallback_report():
    return """# Astro Website Review (Fallback)

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
"""


# ---------------------------
# AGENT: Astro Code Reviewer
# ---------------------------
astro_reviewer = Agent(
    role="Senior Astro + TypeScript Engineer",
    goal="Review and improve an Astro website structure, performance, and code quality",
    backstory="""
You are an expert in Astro, TypeScript, and modern frontend architecture.
You focus on:
- component structure
- performance
- accessibility
- routing correctness
- clean code patterns
"""
)

# ---------------------------
# TASK: full project review
# ---------------------------
project_snapshot = f"""
ASTRO CONFIG:
{read_file(CONFIG)}

TYPESCRIPT CONFIG:
{read_file(TSCONFIG)}

--- COMPONENT SAMPLE ---
{read_file(COMPONENTS / "Hero.astro")}

--- PAGE SAMPLE ---
{read_file(PAGES / "index.astro")}
"""

task = Task(
    description=f"""
You are reviewing a full Astro website project.

Analyze the structure and provide:

1. Problems in architecture
2. TypeScript or Astro issues
3. Performance improvements
4. Component design improvements
5. Concrete refactoring suggestions

Here is the project snapshot:

{project_snapshot}
""",
    expected_output="""
A markdown report with the following sections:
1. Architecture Problems
2. TypeScript/Astro Issues
3. Performance Improvements
4. Component Design Improvements
5. Concrete Refactoring Suggestions

Each section should include specific findings and actionable recommendations.
""",
    agent=astro_reviewer
)

crew = Crew(
    agents=[astro_reviewer],
    tasks=[task],
    verbose=True
)


def main():
    load_env_candidates()

    if not os.getenv("OPENAI_API_KEY"):
        OUTPUT.write_text(fallback_report(), encoding="utf-8")
        print("OPENAI_API_KEY not found; generated fallback review_report.md")
        return

    result = crew.kickoff()
    OUTPUT.write_text(str(result), encoding="utf-8")
    print("CrewAI review complete -> review_report.md generated")


if __name__ == "__main__":
    main()