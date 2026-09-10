# Offline-first symptom triage app

## User-visible outcome
Replace the finance dashboard with a production-style healthcare experience for rural patients: a welcoming entry screen, guided symptom questions, a clear safety-focused triage result, local history, settings, and visible offline status.

## Scope
- Mobile-first shell that remains readable on tablet and desktop.
- Local symptom rules and history with no account requirement.
- Step-by-step checker covering symptoms, duration, severity, age group, and basic risk context.
- Safety-first urgent routing with emergency call action, non-diagnostic language, warning signs, and care guidance.
- Bottom navigation for Check, History, and Settings; simple welcome/help states.
- Installable PWA shell with production-only generated service worker and cached app assets.
- Accessibility controls for font size, high contrast, language choice, local data clearing, and disclaimer.

## Technical approach
- Use React + TypeScript + existing shadcn primitives and Lucide icons.
- Keep triage data in a small local TypeScript rules module and persist history/settings through localStorage with defensive parsing.
- Add `vite-plugin-pwa` with `generateSW`, guarded registration wrapper, `NetworkFirst` navigation, and hashed asset caching.
- Use semantic design tokens in `src/index.css`; remove the remote CSS import and finance-specific visuals.
- Reuse one app shell and page state rather than preserving unused finance routes/components.

## Validation
- Build and lint after implementation.
- Inspect welcome, checker progression, urgent/moderate/low results, history deletion, settings controls, and offline indicator in a browser at mobile and desktop viewports.
