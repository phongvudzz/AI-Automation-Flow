"use client";

import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";

export function AppProviders({
  children,
  ...props
}: React.ComponentProps<typeof ThemeProvider>) {
  return (
    <QueryProvider>
      <ThemeProvider {...props}>{children}</ThemeProvider>
    </QueryProvider>
  );
}
