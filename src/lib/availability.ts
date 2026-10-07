import { availabilitySchema, type Slot } from "./validation";
export function demoSlots(now = new Date()): Slot[] {
  const result: Slot[] = [];
  for (let i = 1; i <= 60; i++) {
    const date = new Date(now);
    date.setUTCDate(date.getUTCDate() + i);
    date.setUTCHours(0, 0, 0, 0);
    if ([0, 6].includes(date.getUTCDay()) || i % 7 === 3) continue;
    for (const type of ["online", "office", "site"] as const)
      for (const hour of type === "site" ? [9] : [9, 12]) {
        const starts = new Date(date);
        starts.setUTCHours(hour);
        result.push({
          id: `preview-${type}-${starts.toISOString()}`,
          type,
          startsAt: starts.toISOString(),
          durationMinutes: type === "site" ? 90 : 45,
          feeNgn: null,
        });
      }
  }
  return result;
}
export async function getAvailability() {
  const url = process.env.DEKORAJ_AVAILABILITY_URL;
  if (!url) return { mode: "preview" as const, slots: demoSlots() };
  if (new URL(url).protocol !== "https:")
    throw new Error("Availability endpoint must use HTTPS");
  const response = await fetch(url, {
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
    headers: process.env.DEKORAJ_AVAILABILITY_TOKEN
      ? { Authorization: `Bearer ${process.env.DEKORAJ_AVAILABILITY_TOKEN}` }
      : {},
  });
  if (!response.ok) throw new Error("Availability unavailable");
  const result = availabilitySchema.parse(await response.json());
  const ids = new Set<string>();
  const slots = result.slots.filter((slot) => {
    if (ids.has(slot.id) || new Date(slot.startsAt) <= new Date()) return false;
    ids.add(slot.id);
    return true;
  });
  return { mode: "live" as const, slots };
}
