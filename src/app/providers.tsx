"use client";

import { useEffect } from "react"
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast"
import { queryClient } from "@/lib/query-client"
import { useAppStore } from "@/lib/store"
import { getSavedUser } from "@/lib/auth"

function AuthLoader({ children }: { children: React.ReactNode }) {
  const setCurrentUser = useAppStore((s) => s.setCurrentUser);

  useEffect(() => {
    const user = getSavedUser();
    console.log('userssss', user)
    if (user) setCurrentUser(user);
  }, []);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthLoader>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#18181b",
              color: "#f4f4f5",
              border: "1px solid rgba(255,255,255,0.1)",
              fontSize: "13px",
            },
          }}
        />
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthLoader>
    </QueryClientProvider>
  )
}