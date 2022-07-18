const Discord = require("discord.js");
const fs = require("fs");
const config = JSON.parse(fs.readFileSync("./cfg/config.json", "utf8"));

module.exports = {
    name: "help",
    description: "Dies ist ein Hilfebefehl!",
    async execute(messageCreate, args){
        const Embed = new Discord.EmbedBuilder()
        .setTitle("Commands from " + messageCreate.client.user.username)
        .setDescription(`Mein Prefix ist ${config.prefix}\n<> = benötigt\n[] = optional`)
        .addFields(
            { name: config.prefix + "help", value: "Gibt alle Commands aus und ihre Funktion"},
            { name: config.prefix + "ping", value: "Client Ping"},
            { name: config.prefix + "meme <subreddit>", value: "Sendet ein zufälliges Meme von Reddit"},
            { name: config.prefix + "clear <amount>", value: "Nachrichten löschen"}
        )
        .setColor("#2980b9")
        .setFooter({text: `Command from ${messageCreate.author.username}`});

        messageCreate.channel.send({ embeds: [Embed]});
    }
}