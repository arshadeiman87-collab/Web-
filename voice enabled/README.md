# TableTalk — Voice-Enabled AI Restaurant Ordering System

A responsive restaurant ordering PWA built with React + Vite. The interface is designed around a top header navigation, touch-friendly controls and a mobile-first layout.

## Included functionality

- Restaurant menu with categories and search
- Menu modifiers and common allergen visibility
- Cart with quantity controls and payment summary
- Multilingual voice/text ordering UI for English, Urdu and Arabic
- Browser speech recognition when supported
- Smart matching flow with clarification fallback
- Structured AI-order JSON example in the management screen
- Order tracking and kitchen status workflow
- Kitchen display with Received → Preparing → Ready → Completed flow
- Admin menu management UI
- Online/offline status indicator
- Offline-friendly PWA shell with service worker
- Accessibility-oriented large controls, semantic labels and high-contrast statuses
- Responsive mobile/tablet/desktop layouts
- End-to-end-ready interaction architecture
- Vitest test setup

## Run locally

```bash
npm install
npm run dev
```

Open the Vite URL shown in the terminal.

## Production build

```bash
npm run build
npm run preview
```

## Tests

```bash
npm test
```

## Payment integration

The checkout flow is implemented as a complete UI workflow. For production, connect the `checkout()` action to Stripe/your payment provider and use a server-side payment intent endpoint.

## AI integration

The UI already models the required structured output:

```json
{
  "items": [
    {
      "menuItem": "Zinger",
      "quantity": 2,
      "modifiers": ["no mayo"],
      "allergies": []
    }
  ],
  "needsClarification": false
}
```

For production, connect this schema to an LLM endpoint and validate the returned object against a server-side JSON schema. Never let the model invent menu items; map only to IDs from the restaurant catalog.

## Suggested production architecture

- Frontend: React + Vite PWA
- Backend: Node.js + Express
- Database: PostgreSQL/Supabase
- Payments: Stripe Payment Intents + webhook
- AI: OpenAI structured outputs/function calling
- Voice: Web Speech API or a server speech-to-text provider
- Realtime kitchen status: WebSockets/Supabase Realtime
- Auth: staff/admin authentication with role-based access

## Screenshots

Add screenshots of the running application here after starting the project:

- `screenshots/menu.png`
- `screenshots/cart.png`
- `screenshots/orders.png`
- `screenshots/kitchen.png`
- `screenshots/admin.png`
