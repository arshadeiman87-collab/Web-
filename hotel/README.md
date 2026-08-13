# StayEase React Frontend

This is a React/Vite conversion of the StayEase Stitch-style frontend shown in the supplied screenshots.

## Run

```bash
npm install
npm run dev
```

Then open the localhost URL Vite gives you.

## Routes

### Public
- `/` Home
- `/hotels` Hotel listing/filter page
- `/hotels/1` Hotel details
- `/login` Owner/Admin login UI
- `/register-hotel` Hotel owner onboarding request

### Hotel Owner
- `/owner/overview`
- `/owner/hotel`
- `/owner/rooms`
- `/owner/bookings`
- `/owner/reviews`
- `/owner/revenue`
- `/owner/cleaning`
- `/owner/settings`

### Admin
- `/admin/overview`
- `/admin/pending`
- `/admin/approved`
- `/admin/owners`
- `/admin/bookings`
- `/admin/revenue`
- `/admin/settings`

## Important

The current version is frontend-only and uses mock data. Buttons/forms demonstrate UI behavior locally.

For the real system, connect these pages to Supabase:
- Supabase Auth for login/roles
- PostgreSQL tables for hotels, owners, rooms, bookings, reviews, cleaning requests
- Supabase Storage for logo, cover, gallery, room photos and verification documents
- RLS so owners can only access their own hotel and admins can access all data
- Realtime for booking/approval notifications

The UI colors, typography, navigation structure and general layout are intentionally kept close to the supplied Stitch screenshots.
