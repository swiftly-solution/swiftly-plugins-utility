import { APIEmbedField, ColorResolvable, WebhookClient } from "discord.js"
import BuildEmbed from "./BuildEmbed";

export default async (task: [string, WebhookClient] | null, title: string, description: string, fields: APIEmbedField[], color: ColorResolvable): Promise<string> => {
    if (!task) return "";
    return (await task[1].editMessage(task[0], {
        embeds: [BuildEmbed(title, description, fields, color)]
    })).id;
}