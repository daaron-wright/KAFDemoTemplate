"use client";

import { ReactNode } from "react";

export default function AuthGuard({ children }: { children: ReactNode }) {
  // Always allow access since auth is removed
  return <>{children}</>;
}
