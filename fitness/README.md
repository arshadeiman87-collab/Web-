# FitFlow – Complete UK Gym SaaS

This ZIP contains a complete **implementation starter** covering the requested product areas:
- Membership management
- QR check-in and face-recognition integration surface
- Dynamic class capacity + waitlist promotion Edge Function
- Personalized AI workout adapter using Supabase history
- Points, leaderboard and rewards
- GoCardless Direct Debit adapter + webhook endpoint + retry data model
- Google Business trial CTA / CRM lead flow
- Structured-data template for class availability
- Webhook audit/retry center
- Monthly gym SaaS subscription data model

## Run
npm install
npm run dev

## Supabase
1. Create a Supabase project.
2. Copy `.env.example` to `.env` and fill the two VITE values.
3. Run `supabase/schema.sql` in SQL Editor.
4. Deploy Edge Functions and set secrets:
   GOCARDLESS_ACCESS_TOKEN
   GOCARDLESS_ENVIRONMENT=sandbox (then live for production)
   GOCARDLESS_WEBHOOK_SECRET
   AI_API_KEY / AI_API_URL
   CRM_WEBHOOK_URL
   SUPABASE_SERVICE_ROLE_KEY

## What is actually complete vs credential-dependent
The application contains the frontend screens, database schema, API adapters and Edge Function endpoints. External providers cannot be authenticated inside a ZIP without the gym's own credentials.

- Face recognition: UI + integration surface. A production biometric provider/camera library and explicit consent/retention policy must be selected.
- GoCardless: API adapter and webhook endpoint included; add the merchant access token and configure the webhook in GoCardless.
- AI: Edge Function calls a configurable AI API; add AI_API_KEY and AI_API_URL.
- Google Business Profile: the app provides the trial CTA/lead flow; the actual Google Business Profile placement is configured in the gym's Google account. Google controls whether enhanced search/Maps features are displayed.
- CRM: generic webhook adapter included.
- Automatic retries: payments table has retry fields and webhook processing architecture; a scheduled Supabase job/cron should invoke your retry worker according to your GoCardless agreement and business rules.

## Production security
Do not put GoCardless, AI, CRM or service-role secrets in VITE_ variables. Keep them in Supabase Edge Function secrets. Enable RLS and create tenant-specific policies before production. Biometric data requires a lawful basis, explicit consent/appropriate safeguards and a retention/deletion policy.

## Demo
The UI is usable immediately without external credentials and labels provider-dependent areas as adapters/sandbox/demo. After credentials and deployment are configured, the same screens can call the Edge Functions.
