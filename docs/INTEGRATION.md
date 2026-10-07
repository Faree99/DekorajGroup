# Business integrations

## Default behaviour

The website runs without credentials. `GET /api/availability` returns `mode: "preview"` and an illustrative next-60-days weekday schedule. All slot fees are `null`; the UI explains that the dates and durations are examples. No reservation is made.

`POST /api/enquiries` validates the submitted JSON. If `DEKORAJ_ENQUIRY_WEBHOOK_URL` is unset it returns `mode: "preview"`; the browser offers a download labelled `not-sent`. The server does not persist or deliver the enquiry. Avoid placing real personal data into preview tests.

## Enquiry delivery

Configure these on the deployment host, never in client-side code:

```dotenv
DEKORAJ_ENQUIRY_WEBHOOK_URL=https://your-backend.example/enquiries
DEKORAJ_ENQUIRY_WEBHOOK_TOKEN=your-server-to-server-token
```

The endpoint receives a JSON `POST` with:

```json
{
  "name": "Example Customer",
  "email": "customer@example.com",
  "phone": "",
  "organisation": "",
  "interest": "Farm project",
  "location": "",
  "budget": "",
  "message": "Project requirements go here.",
  "consent": true,
  "requestId": "UUID-generated-by-the-browser",
  "selectedSlot": null,
  "source": "dekoraj-website",
  "submittedAt": "ISO timestamp"
}
```

Headers include `Content-Type: application/json`, `Idempotency-Key: <requestId>` and an optional bearer `Authorization` header. Enforce idempotency and persistent rate limiting in your backend or deployment gateway. Store the request durably before returning a success status. Client retries reuse the same request ID. Add appropriate bot protection for your actual traffic.

A successful upstream 2xx response produces an **enquiry received** message only. No booked/paid status is inferred. Upstream errors and timeouts return a generic error to the user; secrets and backend responses are not exposed.

## Live availability

```dotenv
DEKORAJ_AVAILABILITY_URL=https://your-backend.example/consultation-availability
DEKORAJ_AVAILABILITY_TOKEN=your-server-to-server-token
```

The endpoint is called server-side with `GET`, no caching, an 8-second timeout and optional bearer token. It must return:

```json
{
  "slots": [
    {
      "id": "unique-slot-id",
      "type": "online",
      "startsAt": "2026-10-12T09:00:00Z",
      "durationMinutes": 45,
      "feeNgn": 25000
    }
  ]
}
```

The sample fee above documents the data type only; it is not an actual Dekoraj price. `type` must be `online`, `office` or `site`; `feeNgn` may be `null` if a quote is required. Dates must be ISO 8601 timestamps with a timezone. The UI displays them in Africa/Lagos. Expired and duplicate slot IDs are excluded.

On consultation submission, the server refetches availability and checks that the submitted ID belongs to the selected consultation type. Price and duration come from the server response, never from a client-supplied price. A slot that disappeared produces HTTP 409. If only enquiry delivery is configured but availability remains in preview mode, calendar submissions are rejected rather than passing sample dates as real availability; general enquiries remain usable.

The final receiving backend must atomically reserve the slot, handle concurrent requests and perform any payment flow. This source does not provide reservation locking, admin login, a scheduling dashboard, a database, email notifications or a payment provider integration.

## Adding paid consultation checkout

Use a real backend for the state machine: available slot → temporary hold → server-created payment session → verified payment webhook → confirmed booking. Never trust a browser redirect alone as proof of payment. Add expiry, duplicate-webhook handling and conflict recovery in that backend. Replace the enquiry-only copy once those operations actually exist.

## API protections already included

- Server-side Zod validation; required consent; length limits; strict allowlist of fields.
- Same-origin checks for browser requests, content-type check and honeypot.
- HTTPS-only integration destinations taken from server environment variables.
- Server-resolved consultation details and explicit conflict/error states.
- Server credentials never use the `NEXT_PUBLIC_` prefix.
- No personal data is deliberately logged by the application.

Host-level body limits, durable rate limiting, operational logging, privacy notices and retention policy are deployment responsibilities.
