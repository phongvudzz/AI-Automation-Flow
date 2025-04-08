"use client";

import {
  CoinsIcon,
  FolderIcon,
  HomeIcon,
  Layers2Icon,
  Settings2Icon,
  ShieldCheckIcon,
} from "lucide-react";
import Logo from "./logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { SignedIn, UserButton } from "@clerk/nextjs";

const routes = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: HomeIcon,
  },
  {
    title: "Workflows",
    url: "/workflows",
    icon: Layers2Icon,
  },
  {
    title: "Credentials",
    url: "/credentials",
    icon: ShieldCheckIcon,
  },
  {
    title: "Billing",
    url: "/billing",
    icon: CoinsIcon,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings2Icon,
  },
  {
    title: "Documentation",
    url: "/documentation",
    icon: FolderIcon,
  },
];

interface DesktopSidebarProps {
  open: boolean;
}

function DesktopSidebar({ open }: DesktopSidebarProps) {
  const pathname = usePathname();

  const activeRoute =
    routes.find(
      (route) => route.url.length > 0 && pathname.includes(route.url)
    ) || routes[0];

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader className="flex items-center-safe justify-center-safe gap-2 h-[50px]">
        <Logo showLogoOnly={!open} />
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((route) => {
                const isActive = activeRoute?.url === route.url;

                return (
                  <SidebarMenuItem key={route.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        key={route.url}
                        href={route.url ? route.url : "/"}
                        className={buttonVariants({
                          variant: isActive
                            ? "sidebarActiveItem"
                            : "sidebarItem",
                        })}
                      >
                        <route.icon size={20} />
                        {route.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-2 flex justify-center items-center">
        <SignedIn>
          <UserButton showName={open} />
        </SignedIn>
      </SidebarFooter>
    </Sidebar>
  );
}

export default DesktopSidebar;
