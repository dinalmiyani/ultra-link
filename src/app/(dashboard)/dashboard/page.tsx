"use client";

import { useMemo } from "react";
import { Header } from "@/components/Header";
import { MetricCard } from "@/features/dashboard/components/MetricCard";
import { EventsChart } from "@/features/analytics/components/EventsChart";
import { TopEventsChart } from "@/features/analytics/components/TopEventsChart";
import { EventsTable } from "@/features/analytics/components/EventsTable";
import { generateMockEvents } from "@/lib/mock-data";
import { Users, Zap, Clock, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  const events = useMemo(() => generateMockEvents(100_000), []);

  const metrics = [
    { title: "Total events",  value: events.length.toLocaleString("en-IN"), change: 12.5, icon: Zap },
    { title: "Active users",  value: "2,341",  change: 8.1,  icon: Users },
    { title: "Avg session",   value: "4m 12s", change: -2.3, icon: Clock },
    { title: "Conversion",    value: "3.6%",   change: 0.4,  icon: TrendingUp },
  ];

  return (
    <>
      <Header title="Dashboard" />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((m) => (
            <MetricCard key={m.title} {...m} />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <EventsChart events={events} />
          </div>
          <div>
            <TopEventsChart events={events} />
          </div>
        </div>

        <EventsTable events={events} />
      </div>
    </>
  );
}