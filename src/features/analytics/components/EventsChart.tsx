"use client"

import { useMemo } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { aggregateByDay } from "@/lib/mock-data";
import type { AnalyticsEvent } from "@/types";

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-white/10 bg-zinc-900 p-3 text-xs shadow-xl">
      <p className="mb-2 font-medium text-zinc-300">{label}</p>
      {payload.map((entry: any) => (
        <p key={entry.name} style={{ color: entry.color }}>
          {entry.name}: <span className="font-semibold">{entry.value.toLocaleString()}</span>
        </p>
      ))}
    </div>
  );
}

interface EventsChartProps {
  events: AnalyticsEvent[];
}

const LINE_COLORS = {
  page_view:     "#3B8BD4",
  btn_click:     "#1D9E75",
  form_submit:   "#EF9F27",
  session_start: "#D85A30",
};

export function EventsChart({ events }: EventsChartProps) {
  const chartData = useMemo(() => aggregateByDay(events), [events]);

  return (
    <Card className="h-72">
      <CardHeader>
        <CardTitle>Events over time</CardTitle>
      </CardHeader>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={chartData} margin={{ top: 4, right: 16, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis
            dataKey="date"
            tick={{ fill: "#71717a", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            // Only show every 5th label so they don't crowd
            tickFormatter={(v, i) => (i % 5 === 0 ? v.slice(5) : "")}
          />
          <YAxis
            tick={{ fill: "#71717a", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: 11, color: "#71717a", paddingTop: 8 }}
          />
          {Object.entries(LINE_COLORS).map(([key, color]) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={color}
              strokeWidth={2}
              dot={false}         // no dots = cleaner at scale
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}