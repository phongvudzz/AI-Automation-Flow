import { TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { LaunchBrowserTask } from "./launch-browser-task";

type Registry = { [K in TaskType]: WorkflowTask & { type: K } };



export const TaskRegistry: Registry = {
    LAUNCH_BROWSER: LaunchBrowserTask,

}