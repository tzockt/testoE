const Discord = require('discord.js');
const colors = require("colors");
const fs = require("fs");
const config = JSON.parse(fs.readFileSync("./cfg/config.json", "utf8"));
require("dotenv").config();

//var client = new Discord.Client();
const client = new Discord.Client({ intents: [Discord.GatewayIntentBits.Guilds,Discord.GatewayIntentBits.GuildMessages,Discord.GatewayIntentBits.MessageContent], partials: [Discord.Partials.Channel] });

// ----------------------------------------------------------------------------------------------------------------------

client.commands = new Discord.Collection();
const CommandFiles = fs.readdirSync("./commands/").filter(files => files.endsWith(".js"));
for (const file of CommandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}


client.on("messageCreate", message => {
    if(!message.content.startsWith(config.prefix) || message.author.bot) return;
    //console.log("fasdgöjkklsdfdsfsfn")

    const args = message.content.slice(config.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === "help"){
        client.commands.get("help").execute(message, args);
    }else if(command === "meme"){
        client.commands.get("meme").execute(message, args);
    }else if(command === "ping"){
        client.commands.get("ping").execute(message, args);
    }else if(command === "clear"){
        client.commands.get("clear").execute(message, args);
    }

});

// client.on("messageReactionAdd", (messageReaction, user) => {
//     if (messageReaction.emoji.id === "740914495521554522") {
//         if (user.bot) return;
//         TicketChannelAdd.Add(messageReaction.message, user);
        
//     }
// });

// ----------------------------------------------------------------------------------------------------------------------

client.login(process.env.token);
client.on("ready", () =>{
    var TicketChannelIDs = [];
    console.log(colors.rainbow(`Logged in as ${client.user.tag} Version: ${config.version}!`));
    client.user.setActivity(`Version: ${config.version}`, {type: Discord.ActivityType.Watching});
     
});
