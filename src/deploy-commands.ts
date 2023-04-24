import { Command } from "./models/Command";

require('dotenv').config();

const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const commands: any = [];
// Grab all the command files from the commands directory you created earlier
const commandsPath = path.join(__dirname, 'command');
const commandFiles = fs.readdirSync(commandsPath).filter((file: string) => file.endsWith('.js') || file.endsWith('.ts'));

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(process.env.CLIENT_TOKEN);

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
			commands.push(command?.data.toJSON());
		} catch (error) {
			console.error(`Error loading command ${filePath}: ` + error);
		}
	}

	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.DEPLOYMENT_ID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();