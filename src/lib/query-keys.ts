export const queryKeys = {
  widgets: {
    all:    () => ["widgets"]            as const,
    list:   () => ["widgets", "list"]   as const,
    detail: (id: string) => ["widgets", "detail", id] as const,
  },
  events: {
    all:  () => ["events"]              as const,
    list: (filters?: object) => ["events", "list", filters] as const,
  },
} as const;