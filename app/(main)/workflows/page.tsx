import React, { Suspense } from "react";
import { AlertCircle, InboxIcon } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { getWorkflowsForUser } from "@/actions/workflows/get-workflows-for-user";

import WorkflowCard from "./_components/workflow-card";
import CreateWorkflowDialog from "./_components/create-workflow-dialog";

const WorkflowPage = () => {
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex justify-between pb-2">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Workflows</h1>
          <p className="text-muted-foreground">Manage your workflows</p>
        </div>
        <CreateWorkflowDialog />
      </div>
      <div className="h-full py-6 overflow-y-auto overflow-x-hidden">
        <Suspense fallback={<UserWorkflowsSkeleton />}>
          <WorkflowsList />
        </Suspense>
      </div>
    </div>
  );
};

export default WorkflowPage;

function UserWorkflowsSkeleton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-32 w-full" />
      ))}
    </div>
  );
}

async function WorkflowsList() {
  const workflows = await getWorkflowsForUser();

  if (!workflows) {
    return (
      <Alert>
        <AlertCircle className="size-4" />
        <AlertTitle>Error loading workflows</AlertTitle>
        <AlertDescription>
          An error occurred while loading your workflows. Please try again
          later.
        </AlertDescription>
      </Alert>
    );
  }

  if (workflows.length === 0) {
    return (
      <div className="flex flex-col gap-4 h-full items-center justify-center">
        <div className="rounded-full bg-accent size-20 flex items-center justify-center">
          <InboxIcon size={40} className="stroke-primary" />
        </div>
        <div className="flex flex-col gap-1 text-center">
          <p className="font-bold">No workflow created yet</p>
          <p className="text-sm text-muted-foreground">
            Click the button below to create your first workflow
          </p>
        </div>
        <CreateWorkflowDialog triggerText="Create your first workflow" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {workflows.map((workflow) => (
        <WorkflowCard key={workflow.id} workflow={workflow} />
      ))}
    </div>
  );
}
