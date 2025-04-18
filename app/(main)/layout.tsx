"use client";
import React, { useState } from "react";
import DesktopSidebar from "@/components/global/sidebar";
import { Separator } from "@/components/ui/separator";
import { BreadscrumbHeader } from "@/components/global/breadscrumb-header";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function LayoutMainScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <SidebarProvider
      open={open}
      onOpenChange={setOpen}
      className="flex h-screen"
    >
      <DesktopSidebar open={open} />
      <div className="flex flex-col flex-1 min-h-screen">
        <header className="flex items-center justify-between px-6 py-4 h-[50px]">
          <BreadscrumbHeader />
        </header>
        <Separator />
        <main className="overflow-auto flex-1 text-accent-foreground px-6 py-4">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
