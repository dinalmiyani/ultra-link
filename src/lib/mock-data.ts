import type { AnalyticsEvent } from "@/types";

const EVENT_NAMES = [
  "page_view", "btn_click", "form_submit", "session_start",
  "session_end", "purchase", "search", "video_play",
  "error_thrown", "api_call",
];

const USER_IDS = Array.from({ length: 500 }, (_, i) => `user_${i + 1}`);

// Generates n events spread over the last 30 days
export function generateMockEvents(count = 100_000): AnalyticsEvent[] {
  const now = Date.now();
  const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;

  return Array.from({ length: count }, (_, i) => ({
    id: `evt_${i}`,
    name: EVENT_NAMES[Math.floor(Math.random() * EVENT_NAMES.length)],
    userId: USER_IDS[Math.floor(Math.random() * USER_IDS.length)],
    timestamp: thirtyDaysAgo + Math.random() * (now - thirtyDaysAgo),
    properties: {
      page: ["/dashboard", "/analytics", "/events"][Math.floor(Math.random() * 3)],
      duration: Math.floor(Math.random() * 300),
    },
  }));
}

// Aggregate raw events into daily buckets for charts
export function aggregateByDay(events: AnalyticsEvent[]) {
  const buckets: Record<string, Record<string, number>> = {};

  for (const event of events) {
    const day = new Date(event.timestamp).toISOString().slice(0, 10);
    if (!buckets[day]) buckets[day] = {};
    buckets[day][event.name] = (buckets[day][event.name] ?? 0) + 1;
  }

  return Object.entries(buckets)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, counts]) => ({ date, ...counts }));
}

// Top N events by frequency
export function topEvents(events: AnalyticsEvent[], n = 5) {
  const counts: Record<string, number> = {};
  for (const e of events) {
    counts[e.name] = (counts[e.name] ?? 0) + 1;
  }
  return Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, n)
    .map(([name, count]) => ({ name, count }));
}