# ResumeForge — AI Resume Builder & ATS Optimizer

A complete frontend-first full-stack-ready demo for the requested resume platform.

## Included
- Editable resume template with live preview
- Light/dark theme
- Collapsible responsive sidebar (desktop navigation collapses to icon rail on mobile)
- PDF export
- Job-description keyword analysis and ATS score
- Actionable ATS suggestions
- Truth-preserving AI bullet rewrite demo (rewrites wording only; does not create metrics or employers)
- Saved version history + restore
- Local persistence for a zero-credential demo
- Accessibility-minded labels, focus states and semantic controls
- Mobile responsive UI
- Automated Vitest tests

## Run
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
```

## Test
```bash
npm test
```

## Important
This package intentionally runs without API keys so every UI button works immediately. A production AI backend should validate structured LLM JSON, enforce authentication, subscription quotas and server-side authorization before connecting a real model.
