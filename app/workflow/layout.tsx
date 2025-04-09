import { ReactNode } from "react";

import Logo from "@/components/global/logo";
import { Separator } from "@/components/ui/separator";
import { SwitchTheme } from "@/components/global/switch-theme";

function WorkflowLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col w-full h-screen">
      {children}
      <Separator />
      <footer className="flex items-center justify-between p-2">
        <Logo />
        <SwitchTheme />
      </footer>
    </div>
  );
}

export default WorkflowLayout;
