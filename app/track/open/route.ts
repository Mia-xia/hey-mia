import { NextResponse } from "next/server";
import { applyNoCacheHeaders, getClientIp, getUserAgent } from "@/lib/trackingHttp";
import { storeTrackingEvent } from "@/lib/trackingStore";

export const runtime = "nodejs";

const TRANSPARENT_GIF = Buffer.from(
  "R0lGODlhAQABAIABAP///wAAACwAAAAAAQABAAACAkQBADs=",
  "base64",
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const scholarId = searchParams.get("id")?.trim();
  const sentAtHint = searchParams.get("ts");

  if (!scholarId) {
    return applyNoCacheHeaders(
      NextResponse.json(
        { error: "Missing required query parameter: id" },
        { status: 400 },
      ),
    );
  }

  try {
    await storeTrackingEvent({
      event_type: "opened",
      scholar_id: scholarId,
      opened_at: new Date().toISOString(),
      ip: getClientIp(req),
      user_agent: getUserAgent(req),
      sent_at_hint: sentAtHint,
    });
  } catch (error) {
    console.error("[track/open] failed to store event", error);
  }

  const res = new NextResponse(TRANSPARENT_GIF, {
    status: 200,
    headers: {
      "Content-Type": "image/gif",
      "Content-Length": String(TRANSPARENT_GIF.length),
    },
  });
  return applyNoCacheHeaders(res);
}

