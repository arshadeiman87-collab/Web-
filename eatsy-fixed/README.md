# Eatsy – Integrated Working Demo

## Run frontend
npm install
npm run dev

## Run optional API adapter
cd server
npm install
node index.js

## Working demo features
- QR camera scanner with manual URL/table fallback
- QR result opens `/table/:number`
- Collapsible + expandable restaurant/admin sidebar
- Add/Edit Dish modal with persistent local demo storage
- Stock toggle; sold-out dishes disappear from customer menu
- English / Urdu / Polish / Arabic language switching across customer + restaurant screens
- RTL-ready Arabic/Urdu content
- Order Now with browser geolocation attempt
- Book a Table working demo form
- Google Maps restaurant link
- Live wait-time demo refresh
- Customer cart + demo checkout
- Restaurant orders/menu/tables/loyalty/analytics screens
- Supabase schema + realtime adapter files
- Stripe/Twilio/SendGrid backend adapters (require your own keys)

## Real integrations
Production Stripe, Twilio, SendGrid, Supabase and Google Business Profile credentials must be supplied in `.env`. Google Business Profile does not allow private credentials to be bundled into a client ZIP.
