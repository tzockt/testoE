const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    name: "clear",
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Nachrichten löschen')
        .addIntegerOption(option =>
            option.setName('anzahl')
                .setDescription('Anzahl der zu löschenden Nachrichten (1-100)')
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(100)),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
            return await interaction.reply({ 
                content: 'Du hast keine Berechtigung, Nachrichten zu löschen.', 
                ephemeral: true 
            });
        }

        const amount = interaction.options.getInteger('anzahl');

        try {
            const messages = await interaction.channel.bulkDelete(amount, true);
            await interaction.reply({ 
                content: `${messages.size} Nachrichten wurden gelöscht.`,
                ephemeral: true
            });
        } catch (error) {
            console.error('Error deleting messages:', error);
            await interaction.reply({ 
                content: 'Fehler beim Löschen der Nachrichten. Möglicherweise sind die Nachrichten zu alt (>14 Tage).', 
                ephemeral: true 
            });
        }
    }
}