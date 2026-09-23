# Project UI Skills Record

This project used three Agent Skills in the local development environment for visual design, motion, and responsive browser QA of the graduation invitation website for **Nguyễn Hồng Hạnh**. The local `.agents/` tooling is excluded from release commits.

---

## 1. Visual Design: `design-taste-frontend`
- **Location:** `.agents/skills/design-taste-frontend/`
- **Source:** `agentic-awesome-skills` (upstream: `Leonxlnx/taste-skill`, commit `3bc6d812`)
- **Why Selected:**
  - Enforces strict anti-generic constraints overriding standard LLM UI clichés (bans purple/blue AI gradients, card-soup layouts, floating badges/pills, and 3-column feature grids).
  - Promotes asymmetric editorial compositions, deterministic typography hierarchy, image-first art direction, and deliberate whitespace.
  - Aligns with the "Editorial Fashion Announcement / Personal Photo Diary" aesthetic rather than a SaaS product landing page.
- **Governs:**
  - Overall page composition, typography pairings, grid layouts, and color palette restraint.
  - Hero section 45/55 editorial split and asymmetric editorial gallery layout.
  - Elimination of decorative cards, pills, tags, and AI badges.

---

## 2. Motion Craft: `emil-design-eng`
- **Location:** `.agents/skills/emil-design-eng/`
- **Source:** `agentic-awesome-skills` (upstream: `emilkowalski/skills`, MIT license)
- **Why Selected:**
  - Focuses on restraint, perceived performance, high-craft easing curves (e.g., `cubic-bezier(0.23, 1, 0.32, 1)`), and tactile feedback.
  - Ban on meaningless animations, bouncy gimmicks, and scale(0) entrances; insists that motion should be subtle, supporting the photography rather than competing with it.
  - Provides crisp guidelines on `clip-path` image reveals, tactile button press scaling (`scale(0.97)`), and GPU-accelerated transforms.
- **Governs:**
  - Opening cover seal unlock transition.
  - Subtle scroll reveals and image fade/clip-in effects.
  - Tactile micro-interactions on RSVP buttons, music controls, and lightbox interactions.
  - Respects `prefers-reduced-motion`.

---

## 3. Browser & Visual QA: `playwright-skill`
- **Location:** `.agents/skills/playwright-skill/`
- **Source:** `agentic-awesome-skills` (upstream: `lackeyjb/playwright-skill`, MIT license)
- **Why Selected:**
  - Enables local browser rendering, headless/headed inspection, and visual snapshot captures across explicit viewports:
    - Mobile primary: `390 × 844` (and `430 × 932`)
    - Tablet: `768 × 1024`
    - Desktop: `1440 × 900`
  - Facilitates the mandatory progressive visual gate reviews with direct screenshot feedback and visual defect detection before any redesign is approved.
- **Governs:**
  - Dev server automated testing and multi-viewport screenshots for Visual Gates 1, 2, 3, and 4.
  - Visual critique loop and responsive breakpoint verification.

---

## Skill Conflict & Hierarchy Rule
1. **PROJECT REQUIREMENTS WIN FIRST:** The verified Grade 12 graduation information for Nguyễn Hồng Hạnh, real photographs in `imgs/`, and Vietnamese typography/content always override generic skill defaults.
2. **Visual Editorial Taste > Framework Conventions:** Photo-driven editorial layout wins over dashboard or component-density advice. No generic cards, badges, or SaaS widgets.
