"use client"

import { queryClient } from "@/lib/query-client"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Toaster } from "react-hot-toast"

export function Provider({ children }: { children: React.ReactNode }) {
  return ( 
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  )
}