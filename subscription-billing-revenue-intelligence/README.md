# Subscription Billing & Revenue Intelligence SaaS

A responsive dark SaaS application for subscription management, billing operations and approved-metric revenue intelligence.

## Included
- Products, plans and trials
- Customer subscriptions and entitlements
- Invoices, coupons and dunning simulation
- Stripe-style webhook endpoint with idempotency protection
- AI-assisted churn summaries
- Natural-language revenue exploration restricted to approved metrics
- Role-based access control
- Immutable-style audit event feed
- Financial test cases
- Mobile-first responsive UI

## Run
Open PowerShell in this folder:
1. `npm install`
2. `npm run install:all`
3. `npm run dev`

Frontend: http://localhost:5173
API: http://localhost:5000

## Test
`npm test`

The application uses a local mock billing layer so every core flow works without requiring live Stripe credentials. Stripe webhook handling is implemented at `/api/webhooks/stripe` and can be connected to Stripe by setting the webhook secret in the server environment.
