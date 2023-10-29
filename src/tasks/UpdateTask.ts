import { WebhookClient } from "discord.js";
import { TasksStatus } from "../types/TasksStatus";
import timeFormat from "./timeFormat";
import ModifyNotification from "../notifications/ModifyNotification";

const emojis = {
    waiting: "⌛",
    working: "⚙️",
    done: "✅",
    failed: "❌"
}

export default async (task: [string, WebhookClient] | null, taskTitle: string, tasks: TasksStatus) => {
    var tasksMessage = ""
    for (const task of Object.keys(tasks)) {
        var timeMessage = ""
        if (tasks[task].startedTime == 0) timeMessage = "N/A"
        else if (tasks[task].startedTime != 0 && tasks[task].endTime == 0) timeMessage = `<t:${Math.floor(tasks[task].startedTime / 1000)}:R>`
        else timeMessage = timeFormat((tasks[task].endTime - tasks[task].startedTime) / 1000)

        if (tasksMessage.length > 0) tasksMessage += `\n`;
        tasksMessage += `${emojis[tasks[task].status]} - ${task} - ${timeMessage}`
    }

    await ModifyNotification(task, taskTitle, tasksMessage, [], 0x00b869)
}