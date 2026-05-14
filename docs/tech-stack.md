# RainPlan Tourist App Tech Stack

## Application Layer
- **Framework:** React Native (Expo)
- **Language:** TypeScript
- **State Management:** React hooks (`useState`, `useMemo`, `useEffect`)
- **Navigation Pattern (current MVP):** State-driven screen rendering

## Planned Production Integrations
- **Authentication:** Firebase Auth (Google + Phone OTP)
- **Payments:** Razorpay (UPI/Card/Net Banking)
- **Weather API:** OpenWeatherMap or Tomorrow.io
- **Maps:** Google Maps SDK
- **Push Notifications:** Firebase Cloud Messaging
- **Analytics:** Mixpanel

## Backend (target architecture)
- **Runtime:** Node.js
- **Database:** PostgreSQL
- **Storage:** AWS S3 or Cloudflare R2

## Build & Run Commands
- `npm install`
- `npm run start`
- `npm run android`
- `npm run ios`
- `npm run web`
- `npx tsc --noEmit` (type-check)
