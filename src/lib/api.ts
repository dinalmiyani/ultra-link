const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";

function getToken() {
  return typeof window !== "undefined"
    ? localStorage.getItem("token")
    : null;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getToken();
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(err.error ?? `HTTP ${res.status}`);
  }

  return res.status === 204 ? (undefined as T) : res.json();
}

export const api = {
  auth: {
    login: (email: string, password: string) =>
      request<{ token: string; user: any }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }),
    register: (name: string, email: string, password: string) =>
      request<{ token: string; user: any }>("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      }),
  },
  widgets: {
    list: () => request<any[]>("/widgets"),
    update: (id: string, patch: object) =>
      request<any>(`/widgets/${id}`, { method: "PATCH", body: JSON.stringify(patch) }),
    delete: (id: string) =>
      request<void>(`/widgets/${id}`, { method: "DELETE" }),
  },
  events: {
    list: (params?: { page?: number; limit?: number; name?: string }) => {
      const qs = new URLSearchParams(params as any).toString();
      return request<any>(`/events${qs ? `?${qs}` : ""}`);
    },
  },
};