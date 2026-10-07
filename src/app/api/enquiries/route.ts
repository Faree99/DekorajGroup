import { NextResponse } from "next/server";
import { allowedOrigin, enquirySchema } from "@/lib/validation";
import { getAvailability } from "@/lib/availability";
export async function POST(request: Request) {
  if (
    !allowedOrigin(request.headers.get("origin"), new URL(request.url).origin)
  )
    return NextResponse.json(
      { error: "This request could not be accepted." },
      { status: 403 },
    );
  if (!request.headers.get("content-type")?.includes("application/json"))
    return NextResponse.json(
      { error: "Expected a JSON request." },
      { status: 415 },
    );
  const body = await request.text();
  if (body.length > 16000)
    return NextResponse.json(
      { error: "Your request is too large." },
      { status: 413 },
    );
  let raw: unknown;
  try {
    raw = JSON.parse(body);
  } catch {
    return NextResponse.json(
      { error: "Invalid request format." },
      { status: 400 },
    );
  }
  const parsed = enquirySchema.safeParse(raw);
  if (!parsed.success)
    return NextResponse.json(
      { error: "Check the required fields and try again." },
      { status: 400 },
    );
  const endpoint = process.env.DEKORAJ_ENQUIRY_WEBHOOK_URL;
  if (!endpoint)
    return NextResponse.json({
      mode: "preview",
      message:
        "Your request is ready to download. Nothing has been sent or booked.",
    });
  try {
    if (new URL(endpoint).protocol !== "https:")
      throw new Error("Invalid configuration");
    const { website: _honeypot, ...data } = parsed.data;
    let selectedSlot = null;
    if (data.slotId) {
      const availability = await getAvailability();
      if (availability.mode !== "live")
        return NextResponse.json(
          {
            error:
              "Live consultation dates are not available yet. Send a general project enquiry instead.",
          },
          { status: 409 },
        );
      selectedSlot = availability.slots.find(
        (s) => s.id === data.slotId && s.type === data.consultationType,
      );
      if (!selectedSlot)
        return NextResponse.json(
          {
            error:
              "This time is no longer available. Refresh the calendar and choose another time.",
          },
          { status: 409 },
        );
    }
    const response = await fetch(endpoint, {
      method: "POST",
      signal: AbortSignal.timeout(10000),
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": data.requestId,
        ...(process.env.DEKORAJ_ENQUIRY_WEBHOOK_TOKEN
          ? {
              Authorization: `Bearer ${process.env.DEKORAJ_ENQUIRY_WEBHOOK_TOKEN}`,
            }
          : {}),
      },
      body: JSON.stringify({
        ...data,
        selectedSlot,
        source: "dekoraj-website",
        submittedAt: new Date().toISOString(),
      }),
    });
    if (!response.ok) throw new Error("Upstream rejected request");
    return NextResponse.json({
      mode: "live",
      message:
        "Your enquiry has been received. The team will follow up with you. No booking or payment has been confirmed.",
    });
  } catch {
    return NextResponse.json(
      {
        error:
          "We could not send your request. Please try again. No booking has been confirmed.",
      },
      { status: 503 },
    );
  }
}
