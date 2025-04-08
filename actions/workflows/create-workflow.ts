"use server";

import prisma from "@/lib/prisma";
import { CreateWorkflowSchema } from "@/schema/workflow";
import { WorkflowStatus } from "@/types/workflow";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export async function CreateWorkflow(formData: CreateWorkflowSchema) {
  const { success, data } = CreateWorkflowSchema.safeParse(formData);

  if (!success) {
    throw new Error("Invalid form data");
  }

  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const initialWorkflow = {};

  const workflow = await prisma.workflow.create({
    data: {
      userId,
      status: WorkflowStatus.DRAFT,
      definition: JSON.stringify(initialWorkflow),
      ...data,
    },
  });

  if (!workflow) throw new Error("Failed to create workflow");

//   redirect(`/workflow/editor/${workflow.id}`);
}
