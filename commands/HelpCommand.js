const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "help",
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Zeigt alle verfügbaren Commands an'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle(`Commands von ${interaction.client.user.username}`)
            .setDescription('Hier sind alle verfügbaren Slash Commands:')
            .addFields(
                { name: '/help', value: 'Zeigt alle Commands an' },
                { name: '/ping', value: 'Bot-Latenz anzeigen' },
                { name: '/meme [subreddit]', value: 'Sendet ein zufälliges Meme von Reddit' },
                { name: '/clear <anzahl>', value: 'Nachrichten löschen (1-100)' }
            )
            .setColor('#2980b9')
            .setFooter({ text: `Angefordert von ${interaction.user.username}` });

        await interaction.reply({ embeds: [embed] });
    }
}