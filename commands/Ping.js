const Discord = require("discord.js");

module.exports = {
    name: "ping",
    execute(messageCreate, args){
        const timeTaken = Date.now() - messageCreate.createdTimestamp;
        messageCreate.reply(`Pong! Diese Nachricht hatte eine Latenz von ${messageCreate.client.ws.ping}ms.`);
        
    }
}