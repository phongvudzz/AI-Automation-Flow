import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { GlobeIcon, LucideProps } from "lucide-react";

export const LaunchBrowserTask = {
  label: TaskType.LAUNCH_BROWSER,
  type: TaskType.LAUNCH_BROWSER,
  icon: (props: LucideProps) => {
    return <GlobeIcon {...props} />;
  },
  isEntryPoint: true,
  credits: 5,
  inputs: [
    {
      name: "Website URL",
      type: TaskParamType.STRING,
      value: "",
      required: true,
      helperText: "Enter the URL of the website you want to open",
      hideHandle: true,
    },
  ],
  outputs: [
    {
        name: "Web page",
        type: TaskParamType.BROWSER_INSTANCE,
    }
  ]
} satisfies WorkflowTask;
