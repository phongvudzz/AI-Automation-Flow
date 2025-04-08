import React from "react";
import CreateWorkflowDialog from "./_components/create-workflow-dialog";

const WorkflowPage = () => {
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Workflows</h1>
          <p className="text-muted-foreground">Manage your workflows</p>
        </div>
        <CreateWorkflowDialog />
      </div>
    </div>
  );
};

export default WorkflowPage;

