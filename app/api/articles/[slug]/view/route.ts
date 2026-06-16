import { NextResponse } from "next/server";
import { recordArticleView } from "@/lib/articleStats";

export const runtime = "nodejs";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const body = (await req.json().catch(() => ({}))) as { visitorId?: unknown };
  return NextResponse.json(await recordArticleView(slug, body.visitorId));
}
