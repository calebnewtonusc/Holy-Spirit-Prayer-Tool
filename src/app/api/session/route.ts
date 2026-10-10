import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const AGENTS = {
  journey: process.env.ELEVENLABS_AGENT_ID ?? process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID,
  guide: process.env.ELEVENLABS_GUIDE_AGENT_ID ?? process.env.NEXT_PUBLIC_ELEVENLABS_GUIDE_AGENT_ID,
} as const;

// In March 2026 the free-tier credits ran out and both agents went silent for
// everyone. Sessions now start only through this route, and one visitor gets
// a handful per hour, so a single tab left reconnecting cannot drain the plan.
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 8;
const hits = new Map<string, number[]>();

function allow(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((at) => now - at < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.set(ip, recent);
  return true;
}

export async function GET(req: NextRequest) {
  const modeParam = req.nextUrl.searchParams.get("mode");
  const mode = modeParam === "guide" ? "guide" : "journey";
  const agentId = AGENTS[mode];
  const apiKey = process.env.ELEVENLABS_API_KEY;

  if (!agentId || !apiKey) {
    return NextResponse.json(
      { error: "The guide isn't set up on this server yet." },
      { status: 503 },
    );
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (!allow(ip)) {
    return NextResponse.json(
      { error: "You've started a lot of sessions this hour. Take a breath and try again in a little while." },
      { status: 429 },
    );
  }

  const upstream = await fetch(
    `https://api.elevenlabs.io/v1/convai/conversation/token?agent_id=${encodeURIComponent(agentId)}`,
    { headers: { "xi-api-key": apiKey }, cache: "no-store" },
  );

  if (!upstream.ok) {
    console.error("elevenlabs token", upstream.status, (await upstream.text()).slice(0, 200));
    return NextResponse.json(
      { error: "The guide couldn't connect just now. Try again in a minute." },
      { status: 502 },
    );
  }

  const body: unknown = await upstream.json();
  const token =
    typeof body === "object" && body !== null && "token" in body && typeof body.token === "string"
      ? body.token
      : null;
  if (!token) {
    return NextResponse.json({ error: "The guide couldn't connect just now." }, { status: 502 });
  }
  return NextResponse.json({ token }, { headers: { "Cache-Control": "no-store" } });
}
