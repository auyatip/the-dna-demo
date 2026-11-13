# ROLE: Senior Product Designer + Senior Frontend Engineer

You are an expert in UX/UI Design, Mobile-First Responsive Design, Design Systems, and Frontend Engineering.

Your task is to **redesign and refactor the UX/UI of the ENTIRE existing application** to deliver a beautiful, modern, cute, polished, intuitive, and production-quality user experience.

This is a **FULL APPLICATION-WIDE UX/UI OVERHAUL**, not a single-page redesign.

## 1. Primary Objective

Transform the entire application into a **Modern Cute Minimal SaaS Dashboard** with a strong Mobile-First approach.

The final design must feel:

- Modern, premium, and professional
- Cute, friendly, and visually delightful
- Minimal, clean, and elegant
- Soft, welcoming, and comfortable
- Highly intuitive and easy to navigate
- Consistent across every page and component
- Beautiful on mobile, tablet, and desktop

Think of a polished modern SaaS product with the visual quality of Linear, Notion, and modern premium dashboard applications, but with a softer, friendlier personality.

Avoid generic-looking admin templates.

## 2. CRITICAL: Audit the Entire Existing Project First

Before modifying any code:

1. Inspect the entire project structure.
2. Identify the frontend framework and existing UI libraries.
3. Identify every route, page, layout, and shared component.
4. Inspect the existing theme, styling conventions, and design patterns.
5. Identify inconsistent UX/UI patterns.
6. Identify mobile responsiveness issues.
7. Identify reusable components that should be improved globally.

Create an internal checklist of every page and component that needs improvement.

**Do not redesign only the homepage or dashboard.**

You must apply the redesign throughout the entire application, including nested routes and secondary screens.

## 3. Design Direction

### Visual Style

Use a Modern Cute Minimal aesthetic.

- Soft, balanced color palette
- Subtle pastel accents
- Clean white or neutral backgrounds
- Gentle shadows and elegant borders
- Rounded corners with consistent radius tokens
- Comfortable whitespace
- Beautiful typography hierarchy
- Friendly but professional icons
- Subtle hover, focus, and active states
- Smooth and tasteful transitions

Avoid:

- Excessively bright colors
- Heavy gradients
- Harsh shadows
- Overly dense layouts
- Outdated admin dashboard styles
- Inconsistent spacing
- Excessive decorations
- Childish or cartoonish interfaces

The interface should be cute through thoughtful details, not excessive decoration.

### Suggested Design Tokens

- Primary: #7C6CF2
- Primary Light: #F1EEFF
- Secondary: #F7A8B8
- Background: #F8F9FC
- Surface: #FFFFFF
- Text Primary: #25263A
- Text Secondary: #7C8195
- Border: #E9EAF1
- Success: #35B89A
- Warning: #F3B45E
- Error: #E87986

Use these as a starting palette and adjust for accessibility and visual harmony.

Create a centralized design system rather than hardcoding colors and spacing everywhere.

## 4. MOBILE FIRST IS MANDATORY

Design every screen starting from a 375px mobile viewport, then progressively enhance for tablet and desktop.

Support at least:

- 320px: Small mobile
- 375px: Standard mobile
- 430px: Large mobile
- 768px: Tablet
- 1024px: Laptop
- 1440px: Desktop

### Mobile Requirements

- No horizontal page overflow
- No clipped content
- No overlapping components
- No unreadable text
- No unnecessarily tiny buttons
- Minimum 44x44px touch targets where practical
- Comfortable spacing between interactive elements
- Touch-friendly navigation
- Responsive typography
- Responsive forms and dialogs
- Appropriate mobile keyboard and input behavior

Mobile usability must be a first-class experience, not a scaled-down desktop layout.

## 5. Redesign ALL Application Areas

### Navigation and Layout

- Main sidebar
- Mobile navigation drawer
- Header / AppBar
- Breadcrumbs
- User profile menu
- Navigation active states
- Page titles and action areas
- Footer, if present

On mobile, replace desktop-only navigation patterns with appropriate mobile navigation.

### Dashboard

- Summary cards
- KPI cards
- Statistics
- Charts
- Quick actions
- Recent activities
- Empty states

Make dashboard cards visually polished, readable, and responsive.

### Data Tables

Redesign all tables and DataGrid components.

Desktop:

- Clear column hierarchy
- Consistent row heights
- Readable typography
- Useful sorting and filtering
- Polished pagination
- Clear action buttons

Mobile:

- Avoid forcing wide desktop tables into narrow screens.
- Use responsive card-based records when appropriate.
- Provide accessible alternatives for complex datasets.
- Keep search, filters, and important actions easy to access.
- Preserve pagination and all existing table functionality.

### Forms

Redesign every form:

- Text fields
- Selects
- Autocomplete
- Date pickers
- Checkboxes
- Radio buttons
- File uploads
- Validation messages
- Helper text
- Save and cancel actions

Use clear labels, consistent spacing, logical grouping, and visible validation feedback.

On mobile, forms should generally use a single-column layout.

### Dialogs and Modals

- Responsive sizing
- Clear visual hierarchy
- Comfortable content spacing
- Mobile-friendly full-screen dialogs or bottom sheets when appropriate
- Accessible close actions
- Clearly separated primary and secondary actions
- Proper scrolling and keyboard handling

### Other Components

Audit and redesign:

- Tabs
- Cards
- Buttons
- Chips
- Badges
- Alerts
- Toast notifications
- Tooltips
- Dropdown menus
- Search interfaces
- Filters
- Pagination
- Loading states
- Skeleton loaders
- Empty states
- Error states
- Confirmation dialogs
- File and document previews
- Authentication pages
- Settings pages
- Detail pages
- Create and edit pages

No existing feature or page should be ignored.

## 6. UX Improvements

Do not focus only on visual appearance.

Improve usability by:

- Reducing unnecessary clicks
- Making primary actions obvious
- Improving information hierarchy
- Simplifying complex forms
- Grouping related information
- Providing helpful empty states
- Making destructive actions clear and safe
- Improving loading and error feedback
- Making mobile workflows comfortable
- Keeping important actions accessible
- Maintaining predictable navigation

Every UI change should improve both aesthetics and usability.

## 7. Technical Requirements

IMPORTANT:

- Use the existing frontend framework and UI library.
- If the project uses Material UI, extend the existing MUI theme and component system.
- Prefer reusable shared components.
- Prefer theme tokens over hardcoded styles.
- Avoid unnecessary dependencies.
- Do not rewrite the application architecture without a clear reason.
- Do not change backend APIs.
- Do not modify database schemas.
- Do not break authentication or authorization.
- Do not change business logic.
- Do not remove existing functionality.
- Preserve all existing routes and workflows.
- Maintain TypeScript type safety.
- Follow the existing code conventions.

Refactor existing components rather than creating disconnected duplicate pages.

## 8. Implementation Strategy

Execute the work in this order:

**Phase 1 — Project Audit**

- Inspect all routes and components.
- Identify existing design problems.
- Create a complete redesign checklist.

**Phase 2 — Global Design System**

- Improve typography.
- Define colors, spacing, shadows, and border radius.
- Improve shared UI components.
- Implement responsive layout foundations.

**Phase 3 — Navigation and Layout**

- Redesign desktop navigation.
- Implement mobile-friendly navigation.
- Improve headers and page containers.

**Phase 4 — Full Page Redesign**

- Update every existing page.
- Improve tables, forms, cards, and dialogs.
- Ensure consistent visual patterns.

**Phase 5 — Mobile Optimization**

- Review every page at mobile viewport sizes.
- Fix overflow, spacing, typography, and navigation.
- Optimize touch interactions.

**Phase 6 — Quality Assurance**

- Run lint and type checks.
- Run production build.
- Test critical workflows.
- Verify responsive layouts.
- Fix issues introduced by the redesign.

## 9. Definition of Done

The task is complete only when:

- Every existing page has been reviewed.
- Every page follows the same design system.
- All major workflows work on mobile.
- Desktop UX remains excellent.
- Tables, forms, and dialogs are responsive.
- No major horizontal overflow exists.
- Existing business logic is preserved.
- Authentication and permissions still work.
- TypeScript and production build pass.
- No unrelated changes are introduced.

Do not claim completion if only a subset of routes has been updated.

## 10. Execution Instructions

You are authorized to inspect and modify the existing frontend codebase.

Do not stop after providing design suggestions.

**Actually implement the redesign in the existing project.**

Work systematically across all pages and shared components.

Maintain a progress checklist so that no routes are forgotten.

If the task is too large for one context window, save the remaining checklist and continue systematically without losing progress.

At the end, report:

1. Pages and components updated
2. Shared design system improvements
3. Mobile responsiveness improvements
4. Tests and build results
5. Remaining issues, if any

**FINAL GOAL: Make the entire application feel like a beautifully designed, premium, cute, modern SaaS product that users genuinely enjoy using on both mobile and desktop.**
