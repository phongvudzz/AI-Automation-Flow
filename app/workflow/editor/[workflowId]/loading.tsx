import { Loader2Icon } from "lucide-react";
import React from "react";

export default function WorkflowIdLoading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Loader2Icon className="animate-spin text-primary" size={30} />
    </div>
  );
}
