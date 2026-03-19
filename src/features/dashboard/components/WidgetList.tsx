"use client";

import { useWidgets } from "../hooks/useWidgets";
import { WidgetCard } from "./WidgetCard";
import { Badge } from "@/components/ui/badge";

export function WidgetList() {
  const { data: widgets, isLoading, isError } = useWidgets();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 animate-pulse rounded-xl bg-white/5" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-900/50 bg-red-950/20 p-4 text-sm text-red-400">
        Failed to load widgets. Please refresh.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 group">
      {widgets?.map((widget) => (
        <WidgetCard key={widget.id} widget={widget}>
          <div className="flex items-center gap-2">
            <Badge variant="info">{widget.type}</Badge>
            <span className="text-xs text-zinc-600">
              Click pencil to rename — watch optimistic update
            </span>
          </div>
        </WidgetCard>
      ))}
    </div>
  );
}