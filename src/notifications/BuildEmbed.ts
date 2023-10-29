import { APIEmbedField, ColorResolvable, EmbedBuilder } from 'discord.js';

export default (title: string, description: string, fields: APIEmbedField[], color: ColorResolvable) => {
    return (new EmbedBuilder()).setTitle(title).setDescription(description).setColor(color).setFields(fields).setThumbnail("https://cdn.skuzzi.ro/swiftly/Swiftly_Logo.png").setFooter({ text: "Swiftly Plugin Utility" }).setTimestamp();
}