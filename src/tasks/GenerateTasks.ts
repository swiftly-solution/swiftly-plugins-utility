import { WebhookClient } from "discord.js";
import PushNotification from "../notifications/PushNotification"

export default async (webhook: string, title: string): Promise<[string, WebhookClient] | null> => {
    const task = await PushNotification(webhook, title, "Loading...", [], 0x00b869);
    return task;
}