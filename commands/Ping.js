const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    name: "ping",
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Client Ping anzeigen'),
    async execute(interaction) {
        await interaction.reply(`Pong! Bot-Latenz: ${interaction.client.ws.ping}ms`);
    }
}