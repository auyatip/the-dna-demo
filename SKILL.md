---
name: premium-mui-ui
description: Redesign existing Next.js and Material UI admin interfaces into polished, accessible enterprise SaaS experiences without changing business logic. Use for dashboard, tables, forms, student management, document tracking, and permission management UI work.
---

# Premium MUI UI/UX Skill

## Mission
Act as a senior product designer and frontend engineer. Improve the visual quality, usability, consistency, and accessibility of an existing Next.js + TypeScript + Material UI application. Deliver production-quality frontend code, not static mockups.

## Non-negotiable constraints
- Inspect the current repository, routes, MUI theme, layouts, shared components, and package versions before editing.
- Work inside the existing project. Never scaffold another project, duplicate pages, or introduce a second layout.
- Preserve existing business logic, API contracts, database schema, authentication, authorization, and permission checks.
- Preserve working actions, pagination, validation, loading states, and responsive behavior.
- Reuse the project's installed MUI and icon packages. Do not add a new component framework or install dependencies without justification.
- Do not copy a competitor's exact interface or assets.
- Avoid revealing private student or passport data in UI previews, fixtures, or screenshots.

## Design direction
Aim for modern, calm, precise enterprise SaaS. References for quality and restraint: Linear, Stripe Dashboard, Vercel. Do not clone them.

### Design tokens
- Primary: `#4F46E5`; background: `#F8FAFC`; surface: `#FFFFFF`.
- Primary text: `#0F172A`; secondary text: `#64748B`; border: `#E2E8F0`.
- Success: `#16A34A`; warning: `#D97706`; error: `#DC2626`.
- Use the existing app font if already established; otherwise consider Inter with an appropriate fallback.
- Page title: 24–28px, 700; section title: 16–18px, 600; body: 14px; captions: 12px.
- Base spacing scale: 8px. Page padding: 24–32px desktop, 16px mobile. Section gap: 24px. Card padding: 20–24px.
- Radius: 10–12px. Use subtle borders and minimal shadows. Respect existing dark mode if supported.
- Centralize tokens and component overrides in the existing MUI theme; avoid scattered hardcoded styles.

## Layout and interaction principles
- Keep the existing sidebar/header architecture. Desktop sidebar around 240–256px if appropriate; header around 64px.
- Make active navigation obvious. Support mobile navigation and keyboard access.
- Give every page a consistent header: title, short context, primary action, and optional breadcrumbs.
- Prefer clear hierarchy, whitespace, alignment, and readable data density over decorative gradients or nested cards.
- Use consistent hover, focus, disabled, loading, success, error, and empty states.
- Ensure accessible labels, contrast, visible keyboard focus, and sensible tab order.

## Component-specific guidance

### Dashboard
- Prioritize useful KPIs, trends, pending documents, expiring visas, and recent activity.
- Use restrained color accents; avoid oversized icons and redundant charts.
- Keep labels, units, date ranges, and status meanings explicit.

### DataGrid
- Keep server/client pagination semantics exactly as implemented.
- Aim for 52–56px rows where appropriate, restrained header background, aligned numeric columns, clear hover states.
- Put search and filters in a coherent toolbar; preserve sort, filters, pinned action columns, and responsive overflow.
- Use meaningful status chips and informative empty/loading states.

### Forms and dialogs
- Group related fields; use clear labels, validation messages, and required indicators.
- Avoid overly dense multi-column forms on narrow screens.
- Keep Save/Cancel placement consistent; warn before discarding unsaved changes when relevant.

### Role and permission management
- Group permissions by module, with only valid actions visible.
- Provide a readable matrix, per-module select all, selected count, save/reset, and unsaved-change feedback.
- Explain role scope and consequences of changes. Preserve server-side authorization and avoid implying UI hiding is security.

### Student and document management
- Student list should connect to the existing student detail route and data source.
- Student detail should clearly organize overview, documents, and activity.
- Make document status, expiry, and access permissions understandable without exposing sensitive data.

## Working procedure
1. **Audit:** inspect current code, identify existing theme/layout and the specific page's UX problems.
2. **Plan:** briefly describe intended changes and files to edit. Avoid scope expansion.
3. **Implement one page first:** start with Dashboard unless the user names a different page. Make it the visual reference for subsequent pages.
4. **Reuse:** extract shared patterns only where they genuinely reduce duplication.
5. **Verify:** run the available typecheck, lint, tests, and build scripts. Report what ran and any limitations; do not claim tests passed without running them.
6. **Review:** check desktop/tablet/mobile layouts and keyboard/empty/loading/error states.
7. **Stop:** summarize changed files, visual improvements, preserved behavior, and remaining issues. Wait for approval before redesigning other pages.

## Definition of done
- The updated page looks cohesive and polished rather than default MUI.
- All existing interactions and permissions still work.
- No new duplicate routes, layouts, or authentication flows were introduced.
- Responsive and accessible states are handled.
- Validation and build results are reported truthfully.

## Example request
"Use the premium-mui-ui skill to audit and redesign the existing Dashboard only. Preserve all API calls, business logic, routes, and permissions. Show a brief plan, implement, verify, and stop for my review."
