import { GatewayIntentBits, Events, Partials } from 'discord.js';
import { Command } from './models/Command';
import { CustomClient } from './models/CustomClient';

const client: CustomClient = new CustomClient({
    intents: [
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers
    ],
    partials: [Partials.Channel, Partials.GuildMember, Partials.Message, Partials.Reaction, Partials.User]
});

const config = function() {
    require('dotenv').config(); //initialize dotenv
    const fs = require('node:fs');
    const path = require('node:path');
    
    client.on('ready', () => {
        if(!client.user) {
            console.log("No user found");
            return;
        }
        console.log(`Logged in as ${client.user.tag}!`);
    });
    
    const commandsPath = path.join(__dirname, 'command');
    const commandFiles = fs.readdirSync(commandsPath).filter((file: string) => file.endsWith('.js') || file.endsWith('.ts'));
    
    (async () => {
        // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
    
            try {
                const module: any = await import (filePath);
                const command: Command = new module[file.split('.')[0]]();
                if(command === undefined || command === null) { 
                    throw new Error(`Command is undefined`);
                }
                console.log(`Loaded command ${command?.data.name}`);
                client.commands.set(command?.data.name, command);
            } catch (error) {
                console.error(`Error loading command ${filePath}: ` + error);
            }
        }
    })();
    
    client.on(Events.InteractionCreate, async interaction => {
        if (!interaction.isChatInputCommand()) return;
    
        const command = client.commands.get(interaction.commandName);
    
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }
    
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    });
    
    
    //make sure this line is the last line
    client.login(process.env.CLIENT_TOKEN); //login bot using token
}

export {client, config}