import type { TTaskPriority, TTaskType } from "./tasks.type";

export const TASK_STATUS: TTaskType[] = ["pending", "in-progress", "done"];

export const STATUS_LABEL: Record<TTaskType, string> = {
    pending: "Pending",
    "in-progress": "In Progress",
    done: "Done",
};

export const TASK_PRIORITY: TTaskPriority[] = ["low", "medium", "high"];

export const PRIORITY_LABEL: Record<TTaskPriority, string> = {
    low: "Low",
    medium: "Medium",
    high: "High",
};
