import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";

export type TrackingEventType = "sent" | "opened" | "clicked";

type TrackingEventBase = {
  event_type: TrackingEventType;
  scholar_id: string;
  ip: string;
  user_agent: string;
};

export type OpenedEvent = TrackingEventBase & {
  event_type: "opened";
  opened_at: string;
  sent_at_hint?: string | null;
};

export type ClickedEvent = TrackingEventBase & {
  event_type: "clicked";
  clicked_at: string;
  target_url: string;
};

export type SentEvent = TrackingEventBase & {
  event_type: "sent";
  sent_at: string;
  template_id?: string | null;
};

export type TrackingEvent = OpenedEvent | ClickedEvent | SentEvent;

const LOCAL_DATA_DIR = path.join(process.cwd(), "data");
const LOCAL_FILE = path.join(LOCAL_DATA_DIR, "tracking-events.jsonl");

async function writeEventToLocalFile(event: TrackingEvent): Promise<void> {
  await mkdir(LOCAL_DATA_DIR, { recursive: true });
  await appendFile(LOCAL_FILE, `${JSON.stringify(event)}\n`, "utf8");
}

async function writeEventToKv(event: TrackingEvent): Promise<void> {
  const kvUrl = process.env.KV_REST_API_URL;
  const kvToken = process.env.KV_REST_API_TOKEN;

  if (!kvUrl || !kvToken) {
    throw new Error("KV_REST_API_URL or KV_REST_API_TOKEN is not configured");
  }

  const payload = JSON.stringify(event);
  const headers = {
    Authorization: `Bearer ${kvToken}`,
    "Content-Type": "application/json",
  };

  const commands: string[][] = [
    ["RPUSH", "tracking:events:all", payload],
    [`RPUSH`, `tracking:events:${event.event_type}`, payload],
  ];

  for (const command of commands) {
    const res = await fetch(kvUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(command),
      cache: "no-store",
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`KV write failed (${res.status}): ${text}`);
    }
  }
}

export async function storeTrackingEvent(event: TrackingEvent): Promise<void> {
  // Prefer persistent KV when available, otherwise use local JSONL for quick local/dev setup.
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    await writeEventToKv(event);
    return;
  }
  await writeEventToLocalFile(event);
}

