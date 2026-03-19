
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Simulates a server that fails 20% of the time — for testing rollback
function mayFail(failRate = 0.2) {
  if (Math.random() < failRate) {
    throw new Error("Server error: request failed");
  }
}

export interface Widget {
  id: string;
  title: string;
  type: "line" | "bar" | "metric" | "table";
}

// In-memory "database" — Phase 5 replaces this with real Postgres
let widgetStore: Widget[] = [
  { id: "w1", title: "Events over time", type: "line" },
  { id: "w2", title: "Top events",       type: "bar" },
  { id: "w3", title: "Active users",     type: "metric" },
  { id: "w4", title: "Recent events",    type: "table" },
];

export const api = {
  widgets: {
    list: async (): Promise<Widget[]> => {
      await delay(400);
      return [...widgetStore];
    },

    update: async (id: string, patch: Partial<Widget>): Promise<Widget> => {
      await delay(300);
      mayFail(); // 20% chance to reject — tests our rollback
      widgetStore = widgetStore.map((w) =>
        w.id === id ? { ...w, ...patch } : w
      );
      return widgetStore.find((w) => w.id === id)!;
    },

    delete: async (id: string): Promise<void> => {
      await delay(250);
      mayFail();
      widgetStore = widgetStore.filter((w) => w.id !== id);
    },

    reorder: async (ids: string[]): Promise<Widget[]> => {
      await delay(200);
      mayFail(0.1); // lower fail rate for drag-drop
      widgetStore = ids.map((id) => widgetStore.find((w) => w.id === id)!);
      return [...widgetStore];
    },
  },
};