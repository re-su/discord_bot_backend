"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.client = void 0;
const discord_js_1 = require("discord.js");
const CustomClient_1 = require("./models/CustomClient");
const client = new CustomClient_1.CustomClient({
    intents: [
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.GuildMessageReactions,
        discord_js_1.GatewayIntentBits.GuildMessageTyping,
        discord_js_1.GatewayIntentBits.GuildVoiceStates,
        discord_js_1.GatewayIntentBits.GuildPresences,
        discord_js_1.GatewayIntentBits.GuildMembers
    ],
    partials: [discord_js_1.Partials.Channel, discord_js_1.Partials.GuildMember, discord_js_1.Partials.Message, discord_js_1.Partials.Reaction, discord_js_1.Partials.User]
});
exports.client = client;
const config = function () {
    require('dotenv').config(); //initialize dotenv
    const fs = require('node:fs');
    const path = require('node:path');
    client.on('ready', () => {
        if (!client.user) {
            console.log("No user found");
            return;
        }
        console.log(`Logged in as ${client.user.tag}!`);
    });
    const commandsPath = path.join(__dirname, 'command');
    const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js') || file.endsWith('.ts'));
    (() => __awaiter(this, void 0, void 0, function* () {
        var _a;
        // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            try {
                const module = yield (_a = filePath, Promise.resolve().then(() => __importStar(require(_a))));
                const command = new module[file.split('.')[0]]();
                if (command === undefined || command === null) {
                    throw new Error(`Command is undefined`);
                }
                console.log(`Loaded command ${command === null || command === void 0 ? void 0 : command.data.name}`);
                client.commands.set(command === null || command === void 0 ? void 0 : command.data.name, command);
            }
            catch (error) {
                console.error(`Error loading command ${filePath}: ` + error);
            }
        }
    }))();
    client.on(discord_js_1.Events.InteractionCreate, (interaction) => __awaiter(this, void 0, void 0, function* () {
        if (!interaction.isChatInputCommand())
            return;
        const command = client.commands.get(interaction.commandName);
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }
        try {
            yield command.execute(interaction);
        }
        catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                yield interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            }
            else {
                yield interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    }));
    //make sure this line is the last line
    client.login(process.env.CLIENT_TOKEN); //login bot using token
};
exports.config = config;
//# sourceMappingURL=discord-config.js.map