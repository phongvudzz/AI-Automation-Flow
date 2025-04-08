"use client";

import TooltipWrapper from "@/components/global/tooltip-wrapper";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { WorkflowStatus } from "@/types/workflow";
import { Workflow } from "@prisma/client";
import { FileTextIcon, PlayIcon, ShuffleIcon } from "lucide-react";
import Link from "next/link";

interface WorkflowCardProps {
  workflow: Workflow;
}

const statusColorMap: Record<WorkflowStatus, string> = {
  DRAFT: "bg-primary text-white",
  PUBLISHED: "bg-success text-white",
};

const WorkflowCard = ({ workflow }: WorkflowCardProps) => {
  const isDraft = workflow.status === "DRAFT";

  return (
    <Card className="border border-separate shadow-sm rounded-lg overflow-hidden hover:shadow-md dark:shadow-primary/30 group/card p-0">
      <CardContent className="p-4 flex items-center justify-between h-[100px]">
        <div className="flex items-center justify-end space-x-3">
          <div
            className={cn(
              "size-10 rounded-full flex items-center justify-center",
              statusColorMap[workflow.status as WorkflowStatus]
            )}
          >
            {isDraft ? (
              <FileTextIcon className="size-5" />
            ) : (
              <PlayIcon className="size-5 text-white" />
            )}
          </div>
          <div>
            <h3 className="text-base font-bold text-muted-foreground flex items-center">
              <TooltipWrapper content={workflow.description}>
                <Link
                  className="flex items-center hover:underline"
                  href={`/workflow/editor/${workflow.id}`}
                >
                  {workflow.name}
                </Link>
              </TooltipWrapper>
              {isDraft && (
                <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-rose-100 text-rose-800 rounded-full">
                  Draft
                </span>
              )}
              {/* <DuplicateWorkflowDialog workflowId={workflow.id} /> */}
            </h3>
            {/* <SchedulerSection
              cron={workflow.cron}
              isDraft={isDraft}
              workflowId={workflow.id}
              creditsCost={workflow.creditsCost}
            /> */}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {/* {!isDraft && <RunButton workflowId={workflow.id} />} */}
          <Link
            href={`/workflow/editor/${workflow.id}`}
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "sm",
              }),
              "flex items-center gap-2"
            )}
          >
            <ShuffleIcon size={16} />
            Edit
          </Link>
          {/* <WorkflowActions
            workflowId={workflow.id}
            workflowName={workflow.name}
          /> */}
        </div>
      </CardContent>
      {/* <LastRunDetails workflow={workflow} /> */}
    </Card>
  );
};

export default WorkflowCard;
