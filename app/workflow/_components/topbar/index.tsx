"use client";

import React from "react";

interface TopBarProps {}

function TopBar({}: TopBarProps) {
  return (
    <header className="flex p-2 border-b-2 border-separate justify-between w-full h-[60px] sticky top-0 bg-background z-10">
      TopBar
    </header>
  );
}

export default TopBar;
