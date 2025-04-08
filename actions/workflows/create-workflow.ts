"use server";

import prisma from "@/lib/prisma";
import { CreateWorkflowSchema } from "@/schema/workflow";
import { WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { Workflow } from "@prisma/client";

export async function CreateWorkflow(form: CreateWorkflowSchema) {
  const { success, data } = CreateWorkflowSchema.safeParse(form);

  console.log("🚀 ~ CreateWorkflow ~ success:", success);
  if (!success) throw new Error("Invalid form data");

  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const initialFlow = {};

  let workflow: Workflow;
  try {
    workflow = await prisma.workflow.create({
      data: {
        userId,
        status: WorkflowStatus.DRAFT,
        definition: JSON.stringify(initialFlow),
        ...data,
      },
    });
  } catch (error) {
    console.error("Failed to create workflow:", error);
    throw error; // Or handle it differently
  }

  return { redirect: `/workflow/editor/${workflow.id}` };
}
