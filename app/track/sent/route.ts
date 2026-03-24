import { NextResponse } from "next/server";
import { applyNoCacheHeaders, getClientIp, getUserAgent } from "@/lib/trackingHttp";
import { storeTrackingEvent } from "@/lib/trackingStore";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: { id?: string; sent_at?: string; template_id?: string } = {};
  try {
    body = await req.json();
  } catch {
    return applyNoCacheHeaders(
      NextResponse.json({ error: "Invalid JSON body" }, { status: 400 }),
    );
  }

  const scholarId = body.id?.trim();
  if (!scholarId) {
    return applyNoCacheHeaders(
      NextResponse.json({ error: "Missing required field: id" }, { status: 400 }),
    );
  }

  try {
    await storeTrackingEvent({
      event_type: "sent",
      scholar_id: scholarId,
      sent_at: body.sent_at || new Date().toISOString(),
      ip: getClientIp(req),
      user_agent: getUserAgent(req),
      template_id: body.template_id ?? null,
    });
  } catch (error) {
    console.error("[track/sent] failed to store event", error);
    return applyNoCacheHeaders(
      NextResponse.json({ error: "Failed to store sent event" }, { status: 500 }),
    );
  }

  return applyNoCacheHeaders(NextResponse.json({ ok: true }, { status: 201 }));
}

