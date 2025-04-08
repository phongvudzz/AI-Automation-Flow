"use client";
import { usePathname } from "next/navigation";
import React, { Fragment } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "../ui/separator";

export const BreadscrumbHeader = () => {
  const pathName = usePathname();

  const paths = pathName === "/dashboard" ? [""] : pathName.split("/");

  return (
    <div className="flex items-center flex-start justify-center h-full gap-1">
      <SidebarTrigger />
      {pathName !== "/dashboard" && (
        <Separator orientation="vertical" className="w-full h-full" />
      )}
      <Breadcrumb>
        <BreadcrumbList>
          {paths.map((path, index) => (
            <Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink className="capitalize" href={`/${path}`}>
                  {path === "/dashboard" ? "home" : path}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index !== paths.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
