import { NextResponse } from "next/server";
import { getArticleStats } from "@/lib/articleStats";

export const runtime = "nodejs";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const { searchParams } = new URL(req.url);
  return NextResponse.json(await getArticleStats(slug, searchParams.get("visitorId")));
}
