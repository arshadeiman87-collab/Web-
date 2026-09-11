# AI Product Feedback Intelligence Hub

A responsive full-stack-style demo dashboard for product feedback intelligence.

## Included requirements
- Reviews, surveys and support-ticket ingestion demo
- AI theme clustering and sentiment detection
- Evidence-linked product insights
- Search, filters and source drill-down
- Trend charts
- Human corrections / review queue
- Scheduled ingestion configuration
- Organization workspace and team roles
- CSV/JSON/JSONL export screens
- AI evaluation metrics and benchmark suite
- Privacy controls including PII redaction, retention and audit logging
- Light/dark appearance
- Responsive mobile layout with collapsible sidebar
- Interactive demo data and working navigation/actions

## Run locally

```bash
npm install
npm run dev
```

Open the Vite URL shown in the terminal.

## Demo credentials
No authentication is required for this front-end demo. Workspace and role screens are populated with sample data.

## Production integration
The UI is designed so a real backend can be connected to PostgreSQL/Supabase, an LLM provider, source APIs/webhooks, object storage, scheduled workers and authentication without changing the main information architecture.
