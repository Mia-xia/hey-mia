import { NextResponse } from "next/server";
import { getArticleStats, recordArticleView, toggleArticleLike } from "@/lib/articleStats";

export const runtime = "nodejs";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const { searchParams } = new URL(req.url);
  return NextResponse.json(await getArticleStats(slug, searchParams.get("visitorId")));
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const body = (await req.json().catch(() => ({}))) as {
    action?: unknown;
    visitorId?: unknown;
  };

  if (body.action === "like") {
    return NextResponse.json(await toggleArticleLike(slug, body.visitorId));
  }

  if (body.action === "view") {
    return NextResponse.json(await recordArticleView(slug, body.visitorId));
  }

  return NextResponse.json({ error: "Unsupported article stats action" }, { status: 400 });
}
