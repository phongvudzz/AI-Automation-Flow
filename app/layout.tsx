import "./globals.css";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";

import { ThemeProvider } from "@/providers/theme-provider";
import { ClerkProviderWrapper } from "@/providers/clerk-provider";

export const metadata: Metadata = {
  title: "AI Automation Flow",
  description:
    "A designed for AI Automation, analytics, and data science projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProviderWrapper>
      <html lang="en" className="mdl-js scroll-smooth" suppressHydrationWarning>
        <body
          className={cn("antialiased", fontVariables)}
          data-new-gr-c-s-check-loaded="14.1229.0"
          data-gr-ext-installed=""
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProviderWrapper>
  );
}
