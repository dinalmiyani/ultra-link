"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { saveAuth } from "@/lib/auth";
import { useAppStore } from "@/lib/store";

export default function LoginPage() {
  const router         = useRouter();
  const setCurrentUser = useAppStore((s) => s.setCurrentUser);

  const [email, setEmail]    = useState("dinal@test.com");
  const [password, setPassword] = useState("password123");
  const [error, setError]    = useState("");
  const [loading, setLoading]  = useState(false);

  async function handleLogin() {
    setLoading(true);
    setError("");
    try {
      const { token, user } = await api.auth.login(email, password);
      saveAuth(token, user);
      setCurrentUser(user);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-900">
      <div className="w-full max-w-sm rounded-xl border border-white/10 bg-zinc-950 p-8">
        <h1 className="mb-6 text-lg font-semibold text-white">
          Sign in to Ultra-Link
        </h1>
        <div className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-blue-500/50"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-blue-500/50"
          />
          {error && <p className="text-xs text-red-400">{error}</p>}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}