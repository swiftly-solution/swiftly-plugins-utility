export interface TasksStatus {
    [taskName: string]: {
        startedTime: number,
        endTime: number,
        status: "waiting" | "working" | "done" | "failed",
    }
}