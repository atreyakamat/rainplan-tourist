# RainPlan Tourist App PRD (v1.0)

## Product Goal
Give tourists in Goa instant indoor plans during rain, based on live weather, current location, and available time.

## Core User Problem
Tourists lose valuable holiday time during sudden monsoon showers and cannot quickly discover nearby indoor experiences with live availability.

## MVP Scope (Tourist App only)
- Fast onboarding (splash, location permission, Google/Phone login, time-window question)
- Home with live weather bar + indoor activity feed
- Activity discovery filters (category, duration, price, distance)
- Experience detail view
- 3-step booking flow (slot, people, confirmation)
- My Bookings (upcoming + past)
- Explore mode for non-rain usage
- Push-notification-ready event model (rain alert, booking updates)

## Functional Requirements
1. **Onboarding in <30s**
   - Required location permission
   - Minimal auth options
   - Time preference captured before home load

2. **Home Screen**
   - Weather status with rain intensity, humidity, temp, forecast
   - Auto refresh every 15 minutes
   - Activity cards sorted by distance then rating

3. **Experience Details**
   - Experience metadata, host details, rating, description
   - Available slots for same day
   - Sticky booking CTA

4. **Booking Flow (max 3 taps)**
   - Tap 1: choose slot
   - Tap 2: choose people (1–10)
   - Tap 3: confirm price and booking

5. **Bookings Screen**
   - Upcoming booking entries with countdown
   - Past bookings for review prompt (phase extension)

6. **Explore Mode**
   - Show all experiences when rain-specific filtering is not active

## Non-Functional Requirements
- Screen load target: <2s perceived response
- Mobile-first readability (12px minimum text)
- Goa-specific visual theme and calming color palette

## Out of Scope (v1)
- In-app host chat
- Multi-city support
- Group/corporate booking
- Referral/loyalty system
