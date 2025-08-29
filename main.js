const Discord = require('discord.js');
const colors = require("colors");
const fs = require("fs");
let config;
try {
    config = JSON.parse(fs.readFileSync("./cfg/config.json", "utf8"));
} catch (error) {
    console.error('Error loading config.json:', error);
    process.exit(1);
}
require("dotenv").config();

//var client = new Discord.Client();
const client = new Discord.Client({ intents: [Discord.GatewayIntentBits.Guilds,Discord.GatewayIntentBits.GuildMessages,Discord.GatewayIntentBits.MessageContent], partials: [Discord.Partials.Channel] });

// ----------------------------------------------------------------------------------------------------------------------

client.commands = new Discord.Collection();
const CommandFiles = fs.readdirSync("./commands/").filter(files => files.endsWith(".js"));
for (const file of CommandFiles) {
    try {
        const command = require(`./commands/${file}`);
        if (command.name) {
            client.commands.set(command.name, command);
        } else {
            console.warn(`Command file ${file} is missing a name property`);
        }
    } catch (error) {
        console.error(`Error loading command ${file}:`, error);
    }
}


client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(`Error executing slash command ${interaction.commandName}:`, error);
        const errorMessage = 'Es gab einen Fehler beim Ausführen dieses Befehls.';
        
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: errorMessage, ephemeral: true });
        } else {
            await interaction.reply({ content: errorMessage, ephemeral: true });
        }
    }
});

// client.on("messageReactionAdd", (messageReaction, user) => {
//     if (messageReaction.emoji.id === "740914495521554522") {
//         if (user.bot) return;
//         TicketChannelAdd.Add(messageReaction.message, user);
        
//     }
// });

// ----------------------------------------------------------------------------------------------------------------------

client.on("ready", async () =>{
    console.log(colors.rainbow(`Logged in as ${client.user.tag} Version: ${config.version}!`));
    client.user.setActivity(`Version: ${config.version}`, {type: Discord.ActivityType.Watching});
    
    // Register slash commands
    const commands = [];
    client.commands.forEach(command => {
        if (command.data) {
            commands.push(command.data.toJSON());
        }
    });
    
    try {
        console.log('Started refreshing application (/) commands.');
        console.log(`Registering ${commands.length} commands:`, commands.map(c => c.name));
        
        // For faster testing, register to specific guild (uncomment and add your guild ID)
        // const guildId = 'YOUR_GUILD_ID_HERE';
        // const guild = client.guilds.cache.get(guildId);
        // if (guild) {
        //     await guild.commands.set(commands);
        //     console.log(`Successfully registered commands to guild: ${guild.name}`);
        // }
        
        // Global registration (takes up to 1 hour)
        await client.application.commands.set(commands);
        console.log('Successfully reloaded application (/) commands globally.');
    } catch (error) {
        console.error('Error registering slash commands:', error);
    }
});

client.login(process.env.token).catch(error => {
    console.error('Failed to login:', error);
    process.exit(1);
});
