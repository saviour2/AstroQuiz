"use client";

import { UserProvider } from "@/context/user-context";
import { Toaster } from "@/components/ui/toaster";
import type { ReactNode } from "react";

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
}
