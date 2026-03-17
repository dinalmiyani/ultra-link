"use client";

import { useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer, Cell
} from "recharts";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { topEvents } from "@/lib/mock-data";
import type { AnalyticsEvent } from "@/types";

const BAR_COLORS = ["#3B8BD4", "#1D9E75", "#EF9F27", "#D85A30", "#9F7AEA"];

interface TopEventsChartProps {
  events: AnalyticsEvent[];
}

export function TopEventsChart({ events }: TopEventsChartProps) {
  const data = useMemo(() => topEvents(events, 5), [events]);

  return (
    <Card className="h-72">
      <CardHeader>
        <CardTitle>Top events</CardTitle>
      </CardHeader>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data} layout="vertical" margin={{ left: 8, right: 16 }}>
          <XAxis
            type="number"
            tick={{ fill: "#71717a", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: "#a1a1aa", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={80}
          />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.04)" }}
            contentStyle={{
              background: "#18181b",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 8,
              fontSize: 12,
            }}
          />
          <Bar dataKey="count" radius={[0, 4, 4, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}