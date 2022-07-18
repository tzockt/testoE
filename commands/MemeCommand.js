const Discord = require("discord.js");
const reddit = require("reddit-image-fetcher");


module.exports = {
    name: "meme",
    description: "Dies ist ein Meme Befehl!",
    async execute(messageCreate, args){
        try {
            const sub_r = args[0] ?? 'memes';
            reddit.fetch({ subreddit: [sub_r], type: 'custom', total: 1 }).then((post_raw) => {
                // console.log(post)
                // Array.isArray(post)
                const post = post_raw[0]; // ah stonks
                const Embed = new Discord.EmbedBuilder()
                .setTitle(post.title ? post.title : "API DOOF")
                .setURL(post.postLink)
                .setImage(post.image)
                .setFooter({text: `Subbreddit: ${post.subreddit}`})
                messageCreate.channel.send({ embeds: [Embed]})
            
            });

        
        } catch (error) {
            console.log(error)
            const ErrEmbed = new Discord.EmbedBuilder()
                .setColor("d50000")
                .setTitle("Fehler!")
                .setDescription(error)

            messageCreate.channel.send({embeds: [ErrEmbed]})
        }
        
    }
}