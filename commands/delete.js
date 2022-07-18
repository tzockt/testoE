const Discord = require("discord.js");

module.exports = {
    name: "delete",
    description: "Meldungen löschen",
    execute(messageCreate, args) {
        messageCreate.channel.bulkDelete(args[0]);


    }
}