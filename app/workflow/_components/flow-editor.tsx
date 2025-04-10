"use client";

import React, { useCallback } from "react";
import {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  FitViewOptions,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Workflow } from "@prisma/client";
import { AppNode } from "@/types/appNode";
import { TaskRegistry } from "@/lib/workflow/registry";
import { TaskType } from "@/types/task";
import { createNewNode } from "@/lib/workflow/create-new-node";

interface FlowEditorProps {
  workflow: Workflow;
}

const snapGrid: [number, number] = [10, 10];

const fitViewOptions: FitViewOptions = {
  padding: 1,
};

function FlowEditor({ workflow }: FlowEditorProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const { setViewport, screenToFlowPosition, updateNodeData } = useReactFlow();

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      const taskType = event.dataTransfer.getData(
        "application/reactflow"
      ) as TaskType;

      if (
        !taskType ||
        typeof taskType !== "string" ||
        !TaskRegistry[taskType]
      ) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = createNewNode(taskType, position);

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <main className="h-full w-full">
      <ReactFlow
        nodes={[]}
        edges={[]}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        fitView
        fitViewOptions={fitViewOptions}
        snapToGrid
        snapGrid={snapGrid}
      >
        <Controls position="top-left" />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </main>
  );
}

export default FlowEditor;
