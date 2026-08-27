# TripPilot AI — AI Travel Planner and Booking Marketplace

## Features included
- Personalized AI-style itinerary generation
- Editable day-by-day itinerary
- Hotel and activity catalogs
- Search
- Budget calculation and budget warnings
- Impossible-plan/budget detection
- Map and route view
- Booking inquiry flow
- Recommendation source/citation page
- Collaborative share summary using clipboard
- Responsive mobile layout
- Offline-friendly service worker and localStorage persistence
- SEO metadata/PWA manifest
- No API keys required for the demo

## Run
```bash
npm install
npm run dev
```

## Production
```bash
npm run build
npm run preview
```

## Note
This is a complete small-project implementation. Demo catalog, AI generation and booking inquiries work locally. For production, replace the demo adapters with a server-side LLM, real hotel/activity APIs, authentication/database, live maps and supplier booking/payment APIs. The UI intentionally does not claim that demo inventory is live-bookable.
