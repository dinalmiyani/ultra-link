"use client";

import { Bell } from "lucide-react";
import { useAppStore } from "@/lib/store";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const { presentUsers } = useAppStore();

  return (
    <header className="flex h-16 items-center justify-between border-b border-white/10 bg-zinc-950 px-6">
      <h1 className="text-sm font-semibold text-white">{title}</h1>

      <div className="flex items-center gap-4">
        {presentUsers.length > 0 && (
          <div className="flex items-center gap-1">
            <span className="mr-2 flex items-center gap-1.5 text-xs text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Live
            </span>
            <div className="flex -space-x-2">
              {presentUsers.slice(0, 4).map((user) => (
                <div
                  key={user.id}
                  title={user.name}
                  className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-zinc-950 text-xs font-semibold text-white ring-1 ring-white/20"
                  style={{ backgroundColor: user.color }}
                >
                  {user.name.split(" ").map((n) => n[0]).join("")}
                </div>
              ))}
            </div>
          </div>
        )}

        <button className="rounded-md p-1.5 text-zinc-400 hover:bg-white/10 hover:text-white">
          <Bell size={16} />
        </button>
      </div>
    </header>
  );
}