import { AppNode } from "@/types/appNode";
import { TaskType } from "@/types/task";
import { XYPosition } from "@xyflow/react";

export function createNewNode(
  nodeType: TaskType,
  position: XYPosition = { x: 0, y: 0 }
): AppNode {
  return {
    id: crypto.randomUUID(),
    type: nodeType,
    position,
    dragHandle: ".drag-handle",
    data: {
      type: nodeType,
      inputs: {},
    },
  } satisfies AppNode;
}
