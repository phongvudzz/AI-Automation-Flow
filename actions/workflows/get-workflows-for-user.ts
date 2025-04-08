"use server";

import { auth } from "@clerk/nextjs/server";
import { Workflow } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function getWorkflowsForUser(): Promise<Workflow[]> {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  let workflows: Workflow[] = []

  try {
    workflows = await prisma?.workflow.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  } catch (error) {
    console.error("Failed to get workflows for user:", error);
    throw error; // Or handle it differently
  }

  return workflows;
}
