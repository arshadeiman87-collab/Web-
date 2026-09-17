# LumaCart — AI-Powered E-commerce Shopping Assistant

A professional Next.js commerce starter with a catalog UI, AI shopping assistant surface, product comparison flows, admin inventory analytics, order tracking, responsive layout, Supabase schema, Stripe-ready checkout, RAG utilities, prompt-injection protection, rate limiting, tests and deployment configuration.

## Run locally

```bash
npm install
copy .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Environment

Fill the Supabase, Stripe and LLM credentials in `.env.local`. The included UI works with local catalog data so the product experience can be explored immediately.

## Architecture

- Next.js App Router
- Supabase/PostgreSQL schema with product/order/policy/AI event tables
- Catalog-grounded retrieval utilities
- Assistant API with rate limiting and prompt-injection checks
- Stripe-ready checkout page
- Admin inventory and analytics dashboard
- Responsive header navigation and mobile-first layout
- Vitest security tests

## Production checklist

1. Connect Supabase and enable RLS with role-scoped policies.
2. Replace local catalog retrieval with pgvector embeddings and approved-document retrieval.
3. Connect the LLM provider using server-only credentials and structured JSON output validation.
4. Create Stripe Checkout/PaymentIntent server routes and verify webhook signatures.
5. Add Supabase Auth middleware and admin role checks.
6. Persist rate limits in a shared store for multi-instance deployments.
7. Add end-to-end Playwright coverage for auth, search, assistant, checkout and order tracking.
8. Add observability and analytics events.
9. Deploy the Next.js app to Vercel and configure environment variables.
