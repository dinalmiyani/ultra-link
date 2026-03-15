export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  color: string; // for presence feature later
}

export interface DashboardWidget {
  id: string;
  title: string;
  type: "line" | "bar" | "metric" | "table";
  position: { x: number; y: number };
}

export interface AnalyticsEvent {
  id: string;
  name: string;
  userId: string;
  timestamp: number;
  properties: Record<string, unknown>;
}