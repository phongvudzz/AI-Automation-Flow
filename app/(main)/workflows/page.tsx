import React from "react";

const WorkflowPage = () => {
  return <div className="flex-1 flex flex-col h-full">
    <div className="flex justify-between">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">Workflows</h1>
        <p className="text-muted-foreground">Manage your worlflows</p>
      </div>
  <CreateWorkflowDialog />
    </div>
  </div>
};

export default WorkflowPage;
