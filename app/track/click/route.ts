import { NextResponse } from "next/server";
import { applyNoCacheHeaders, getClientIp, getUserAgent } from "@/lib/trackingHttp";
import { storeTrackingEvent } from "@/lib/trackingStore";

export const runtime = "nodejs";

const DEFAULT_ALLOWED_HOSTS = ["www.bohrium.com"];

function getAllowedHosts(): string[] {
  const envHosts = process.env.TRACKING_ALLOWED_HOSTS;
  if (!envHosts) return DEFAULT_ALLOWED_HOSTS;
  return envHosts
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

function validateTarget(target: string): URL {
  if (!target) {
    throw new Error("Missing required query parameter: target");
  }

  let parsed: URL;
  try {
    parsed = new URL(target);
  } catch {
    throw new Error("Invalid target URL");
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new Error("target must use http or https");
  }

  const enforceAllowedHosts = process.env.TRACKING_ENFORCE_ALLOWED_HOSTS !== "false";
  if (enforceAllowedHosts) {
    const allowedHosts = getAllowedHosts();
    if (!allowedHosts.includes(parsed.hostname.toLowerCase())) {
      throw new Error(`target hostname is not allowed: ${parsed.hostname}`);
    }
  }

  // Bohrium links should stay on HTTPS.
  if (
    parsed.hostname.toLowerCase().endsWith("bohrium.com") &&
    parsed.protocol !== "https:"
  ) {
    throw new Error("Bohrium target must use https");
  }

  return parsed;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const scholarId = searchParams.get("id")?.trim();
  const rawTarget = searchParams.get("target")?.trim() || "";

  if (!scholarId) {
    return applyNoCacheHeaders(
      NextResponse.json(
        { error: "Missing required query parameter: id" },
        { status: 400 },
      ),
    );
  }

  let targetUrl: URL;
  try {
    targetUrl = validateTarget(rawTarget);
  } catch (error) {
    return applyNoCacheHeaders(
      NextResponse.json(
        { error: error instanceof Error ? error.message : "Invalid target URL" },
        { status: 400 },
      ),
    );
  }

  try {
    await storeTrackingEvent({
      event_type: "clicked",
      scholar_id: scholarId,
      clicked_at: new Date().toISOString(),
      ip: getClientIp(req),
      user_agent: getUserAgent(req),
      target_url: targetUrl.toString(),
    });
  } catch (error) {
    console.error("[track/click] failed to store event", error);
  }

  const redirectRes = NextResponse.redirect(targetUrl, { status: 302 });
  return applyNoCacheHeaders(redirectRes);
}

