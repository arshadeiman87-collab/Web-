# TradePro 360 – Smart Booking & Dispatch Platform

A small but functional full-stack demo for UK plumbers, electricians and cleaners.

## Included working features
- Booking / free quote widget with address + GPS browser location.
- AI-style dispatch engine: scores available engineers by distance, skill and workload and auto-assigns the best match.
- Live tracking demo: engineer coordinates can be moved from the dashboard and the customer tracking page updates by polling.
- Dynamic UK parts pricing using a seeded local parts catalogue and quote calculator.
- Invoice generation as printable HTML/PDF-ready invoice, with browser Save as PDF.
- Stripe Checkout integration endpoint when `STRIPE_SECRET_KEY` is supplied; otherwise a fully working demo payment flow.
- Pay Later option.
- Client portal: photo upload, chat messages and ratings.
- White-label trade-owner dashboard: business name/accent configurable and bookings managed centrally.
- Google Business Profile style “Book a Free Quote” widget / landing page. The real GBP booking button must be configured in Google Business Profile to point to the deployed `/book` URL; Google does not automatically grant arbitrary GPS data to a third-party app, so the app asks for browser location permission.

## Run
Requirements: Node.js 18+.

```bash
npm run install-all
npm run dev
```

Frontend: http://localhost:5173
API: http://localhost:4000

Demo dashboard: http://localhost:5173/dashboard
Booking widget: http://localhost:5173/book
Client tracking: open a booking and use its Track button.

## Optional Stripe
Create `server/.env`:
```
STRIPE_SECRET_KEY=sk_test_...
PUBLIC_APP_URL=http://localhost:5173
```
Without a Stripe key, the Pay Now button uses a demo payment flow so the project remains runnable without external credentials.
