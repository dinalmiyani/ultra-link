"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, BarChart2, Zap,
  Settings, ChevronLeft, ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store";

const navItems = [
  { href: "/dashboard",  label: "Dashboard",  icon: LayoutDashboard },
  { href: "/analytics",  label: "Analytics",  icon: BarChart2 },
  { href: "/events",     label: "Events",     icon: Zap },
  { href: "/settings",   label: "Settings",   icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar, currentUser } = useAppStore();

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r border-white/10 bg-zinc-950 transition-all duration-300",
        sidebarOpen ? "w-56" : "w-16"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4">
        {sidebarOpen && (
          <span className="text-sm font-semibold tracking-tight text-white">
            Ultra-Link
          </span>
        )}
        <button
          onClick={toggleSidebar}
          className="rounded-md p-1.5 text-zinc-400 hover:bg-white/10 hover:text-white"
        >
          {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-2 py-3">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                isActive
                  ? "bg-white/10 text-white"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon size={16} className="shrink-0" />
              {sidebarOpen && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      {currentUser && (
        <div className="border-t border-white/10 p-3">
          <div className="flex items-center gap-3">
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
              style={{ backgroundColor: currentUser.color }}
            >
              {currentUser.name.split(" ").map((n) => n[0]).join("")}
            </div>
            {sidebarOpen && (
              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-white">{currentUser.name}</p>
                <p className="truncate text-xs text-zinc-500">{currentUser.email}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}