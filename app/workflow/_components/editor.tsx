"use client";

import React from "react";
import { Workflow } from "@prisma/client";

import { ReactFlowProvider } from "@xyflow/react";

import TopBar from "./topbar";
import TaskMenu from "./task-menu";
import FlowEditor from "./flow-editor";

interface EditorProps {
  workflow: Workflow;
}

function Editor({ workflow }: EditorProps) {
  return (
    <ReactFlowProvider>
      <div className="flex flex-col h-full w-full overflow-hidden">
        <TopBar />
        <section className="flex h-full overflow-auto">
            <TaskMenu />
            <FlowEditor workflow={workflow} />
        </section>
      </div>
    </ReactFlowProvider>
  );
}

export default Editor;
