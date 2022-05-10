const Discord = require("discord.js");
const reddit = require('reddit.images');


module.exports = {
    name: "meme",
    description: "Dies ist ein Meme Befehl!",
    async execute(messageCreate, args){
        try {
            const subreddit = args[0] ? args[0] : 'memes';
            reddit.FetchSubredditPost({ subreddit: subreddit }).then((post) => {
                const Embed = new Discord.MessageEmbed()
                .setTitle(post.title)
                .setURL(post.postLink)
                .setImage(post.image)
                .setFooter({text: `Posted by ${post.author}`})
            messageCreate.channel.send({ embeds: [Embed]})
            });

        
        } catch (error) {
            const ErrEmbed = new Discord.MessageEmbed()
                .setColor("d50000")
                .setTitle("Fehler!")
                .setDescription(error)

            messageCreate.channel.send({embeds: [ErrEmbed]})
        }
        
    }
}