import { test } from "node:test";
import assert from "node:assert/strict";
import {
  enquirySchema,
  allowedOrigin,
  availabilitySchema,
} from "../src/lib/validation";
import { demoSlots } from "../src/lib/availability";
const valid = {
  name: "Test Person",
  email: "test@example.com",
  interest: "Farm construction",
  message: "A commercial poultry project for discussion.",
  consent: true,
  requestId: "4f1223ec-1c6e-4823-9d95-923d9a1db097",
};
test("Enquiries require consent and valid contact details", () => {
  assert.equal(enquirySchema.safeParse(valid).success, true);
  assert.equal(
    enquirySchema.safeParse({ ...valid, consent: false }).success,
    false,
  );
  assert.equal(
    enquirySchema.safeParse({ ...valid, email: "invalid" }).success,
    false,
  );
});
test("Rejects honeypot input, oversized content and unexpected price fields", () => {
  assert.equal(
    enquirySchema.safeParse({ ...valid, website: "spam" }).success,
    false,
  );
  assert.equal(
    enquirySchema.safeParse({ ...valid, message: "a".repeat(4001) }).success,
    false,
  );
  assert.equal(enquirySchema.safeParse({ ...valid, feeNgn: 0 }).success, false);
});
test("Rejects a foreign browser origin", () => {
  assert.equal(
    allowedOrigin("https://other.example", "https://dekoraj.example"),
    false,
  );
  assert.equal(
    allowedOrigin("https://dekoraj.example", "https://dekoraj.example"),
    true,
  );
});
test("Preview slots use unique IDs, future dates, valid types and explicit unknown prices", () => {
  const now = new Date("2026-09-21T18:00:00Z");
  const slots = demoSlots(now);
  assert.equal(availabilitySchema.safeParse({ slots }).success, true);
  assert.equal(new Set(slots.map((s) => s.id)).size, slots.length);
  assert.ok(
    slots.every((s) => new Date(s.startsAt) > now && s.feeNgn === null),
  );
  assert.ok(
    slots.every((s) => ![0, 6].includes(new Date(s.startsAt).getUTCDay())),
  );
});
