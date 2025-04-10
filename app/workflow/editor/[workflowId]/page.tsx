import React from "react";

import prisma from "@/lib/prisma";

import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import Editor from "@/app/workflow/_components/editor";

async function WorkflowIdPage({ params }: { params: { workflowId: string } }) {
  const { workflowId } = params;
  const { userId } = await auth();

  if (!userId) {
    return redirect("/login");
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      userId,
      id: workflowId,
    },
  });

  if (!workflow) {
    throw new Error("Workflow not found");
  }

  return <Editor workflow={workflow} />;
}

export default WorkflowIdPage;
