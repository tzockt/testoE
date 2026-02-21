const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    name: "xyz",
    data: new SlashCommandBuilder()
        .setName('xyz')
        .setDescription('This is a xyz Command!'),
    async execute(interaction) {

    }
}
