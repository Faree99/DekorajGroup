import { NextResponse } from "next/server";
import { getAvailability } from "@/lib/availability";
export const dynamic = "force-dynamic";
export async function GET() {
  try {
    return NextResponse.json(await getAvailability(), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json(
      {
        error:
          "Availability is temporarily unavailable. Please try again or send a project enquiry.",
      },
      { status: 503 },
    );
  }
}
