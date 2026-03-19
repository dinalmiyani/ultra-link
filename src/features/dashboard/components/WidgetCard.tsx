"use client";

import { useState, useRef, useEffect } from "react";
import { Pencil, Trash2, Check, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useUpdateWidget } from "../hooks/useUpdateWidget";
import { useDeleteWidget } from "../hooks/useDeleteWidget";
import type { Widget } from "@/lib/api";

interface WidgetCardProps {
  widget: Widget;
  children?: React.ReactNode;
}

export function WidgetCard({ widget, children }: WidgetCardProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(widget.title);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateWidget = useUpdateWidget();
  const deleteWidget = useDeleteWidget();

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  function handleRename() {
    const trimmed = draft.trim();
    if (!trimmed || trimmed === widget.title) {
      setEditing(false);
      setDraft(widget.title);
      return;
    }
    updateWidget.mutate(
      { id: widget.id, patch: { title: trimmed } },
      { onError: () => setDraft(widget.title) }
    );
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter")  handleRename();
    if (e.key === "Escape") { setEditing(false); setDraft(widget.title); }
  }

  const isPending = updateWidget.isPending || deleteWidget.isPending;

  return (
    <Card className={cn("transition-opacity", isPending && "opacity-60")}>
      <div className="mb-4 flex items-center justify-between gap-2">

        {editing ? (
          <div className="flex flex-1 items-center gap-2">
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 rounded border border-blue-500/50 bg-white/5 px-2 py-0.5 text-sm text-white outline-none"
            />
            <button onClick={handleRename} className="text-emerald-400 hover:text-emerald-300">
              <Check size={14} />
            </button>
            <button onClick={() => { setEditing(false); setDraft(widget.title); }}
              className="text-zinc-500 hover:text-zinc-300">
              <X size={14} />
            </button>
          </div>
        ) : (
          <h3 className="text-sm font-medium text-zinc-300">{widget.title}</h3>
        )}

        {!editing && (
          <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={() => setEditing(true)}
              className="rounded p-1 text-zinc-600 hover:bg-white/10 hover:text-zinc-300"
            >
              <Pencil size={13} />
            </button>
            <button
              onClick={() => deleteWidget.mutate(widget.id)}
              className="rounded p-1 text-zinc-600 hover:bg-white/10 hover:text-red-400"
            >
              <Trash2 size={13} />
            </button>
          </div>
        )}
      </div>

      {children}
    </Card>
  );
}