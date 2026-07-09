# Flight Booking UI (Angular)

A minimal Angular 17 standalone-component front end for the Spring Boot flight booking backend.

## Setup

```bash
npm install
npm start
```

The app runs at `http://localhost:4200` and expects the backend at `http://localhost:8080`
(see `API_URL` constants in `src/app/services/*.service.ts` if yours differs).

## What's included

- **Login / Register** — calls `/api/auth/login` and `/api/auth/register`, stores the JWT
  in `localStorage`, and attaches it to every request via an HTTP interceptor.
- **Flights page** — search by departure/destination, book a flight, and (if logged in as
  an admin) add, edit, or delete flights.
- **My Bookings page** — look up bookings by passenger ID and cancel confirmed ones.
- **Route guard** — `/flights` and `/bookings` require login.

## Notes / simplifications

- The backend's `/login` response doesn't include a user ID, and bookings are tied to a
  `passengerId` rather than the logged-in user directly, so the UI just lets you type in a
  passenger ID on the Flights and Bookings pages. Wire this up to a real passenger record
  in your backend if you want it tied to the logged-in account automatically.
- `RegisterRequest.role` is required by validation but ignored by the backend (it always
  registers as `ROLE_USER`), so the UI sends `"ROLE_USER"` silently without showing a field
  for it.
- Styling is intentionally plain — no UI framework, just a small `styles.css`.
