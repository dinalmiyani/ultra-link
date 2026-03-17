"use client";

import { useRef, useState, useMemo } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { AnalyticsEvent } from "@/types";

const EVENT_BADGE: Record<string, "success" | "info" | "warning" | "danger" | "default"> = {
  page_view:     "info",
  btn_click:     "success",
  form_submit:   "warning",
  session_start: "default",
  error_thrown:  "danger",
};

function formatTime(ts: number) {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60)   return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

interface EventsTableProps {
  events: AnalyticsEvent[];
}

export function EventsTable({ events }: EventsTableProps) {
  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  function handleSearch(value: string) {
    setSearch(value);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(value);
    }, 300);
  }

  const filtered = useMemo(() => {
    if (!debouncedSearch) return events;
    const q = debouncedSearch.toLowerCase();
    return events.filter(
      (e) => e.name.includes(q) || e.userId.includes(q)
    );
  }, [events, debouncedSearch]);

  // The virtualizer — this is what makes 100k rows possible
  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: filtered.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 44,   // estimated row height in px
    overscan: 5,              // render 5 extra rows above/below viewport
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Events feed
          <span className="ml-2 text-zinc-500">
            ({filtered.length.toLocaleString("en-IN")} rows)rows
          </span>
        </CardTitle>
        <input
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search events or users..."
          className="w-56 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-600 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
        />
      </CardHeader>

      <div className="grid grid-cols-4 border-b border-white/10 px-4 py-2 text-xs text-zinc-500">
        <span>Event</span>
        <span>User</span>
        <span>Page</span>
        <span className="text-right">Time</span>
      </div>

      {/* Virtualized scroll container */}
      <div ref={parentRef} className="h-80 overflow-auto">
        <div style={{ height: virtualizer.getTotalSize(), position: "relative" }}>
          {virtualizer.getVirtualItems().map((vItem) => {
            const event = filtered[vItem.index];
            return (
              <div
                key={vItem.key}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: vItem.size,
                  transform: `translateY(${vItem.start}px)`,
                }}
                className="grid grid-cols-4 items-center border-b border-white/5 px-4 text-xs hover:bg-white/5"
              >
                <span>
                  <Badge variant={EVENT_BADGE[event.name] ?? "default"}>
                    {event.name}
                  </Badge>
                </span>
                <span className="text-zinc-400">{event.userId}</span>
                <span className="text-zinc-500">
                  {event.properties.page as string}
                </span>
                <span className="text-right text-zinc-600">
                  {formatTime(event.timestamp)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}