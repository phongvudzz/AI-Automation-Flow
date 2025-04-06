import React from "react";

export default function LayoutMainScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      Main Screen 
      {children}
    </div>
  );
}
