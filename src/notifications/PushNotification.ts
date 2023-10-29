import { APIEmbedField, ColorResolvable, WebhookClient } from "discord.js"
import BuildEmbed from "./BuildEmbed";

export default async (webhook: string, title: string, description: string, fields: APIEmbedField[], color: ColorResolvable): Promise<[string, WebhookClient] | null> => {
    if (webhook == "" || webhook == null) return null;

    const client = new WebhookClient({ url: webhook });

    return [(await client.send({
        avatarURL: "https://cdn.skuzzi.ro/swiftly/Swiftly_Logo.png",
        username: "Swiftly Plugin Utility",
        embeds: [BuildEmbed(title, description, fields, color)]
    })).id, client];
}