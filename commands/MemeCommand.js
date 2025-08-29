const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const reddit = require("reddit-image-fetcher");

module.exports = {
    name: "meme",
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Sendet ein zufälliges Meme von Reddit')
        .addStringOption(option =>
            option.setName('subreddit')
                .setDescription('Das Subreddit von dem das Meme kommen soll')
                .setRequired(false)),
    async execute(interaction) {
        await interaction.deferReply();
        
        try {
            const subreddit = interaction.options.getString('subreddit') ?? 'memes';
            const posts = await reddit.fetch({ subreddit: [subreddit], type: 'custom', total: 1 });
            
            if (!posts || posts.length === 0) {
                await interaction.editReply('Keine Memes in diesem Subreddit gefunden.');
                return;
            }
            
            const post = posts[0];
            const embed = new EmbedBuilder()
                .setTitle(post.title || "Meme")
                .setURL(post.postLink)
                .setImage(post.image)
                .setFooter({ text: `Subreddit: r/${post.subreddit}` })
                .setColor('#ff4500');
            
            await interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.error('Meme command error:', error);
            const errorEmbed = new EmbedBuilder()
                .setColor('#d50000')
                .setTitle('Fehler!')
                .setDescription('Ein Fehler ist beim Laden des Memes aufgetreten.');

            await interaction.editReply({ embeds: [errorEmbed] });
        }
    }
}