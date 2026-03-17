import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;    
  icon?: LucideIcon;
  loading?: boolean;
}

export function MetricCard({ title, value, change, icon: Icon, loading }: MetricCardProps) {
  const isPositive = change !== undefined && change >= 0;

  if (loading) {
    return (
      <Card className="animate-pulse">
        <div className="h-4 w-24 rounded bg-white/10" />
        <div className="mt-4 h-8 w-32 rounded bg-white/10" />
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {Icon && <Icon size={16} className="text-zinc-500" />}
      </CardHeader>
      <p className="text-2xl font-semibold text-white">{value}</p>
      {change !== undefined && (
        <p className={cn("mt-1 text-xs", isPositive ? "text-emerald-400" : "text-red-400")}>
          {isPositive ? "+" : ""}{change}% from last week
        </p>
      )}
    </Card>
  );
}