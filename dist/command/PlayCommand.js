"use strict";
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
exports.PlayCommand = void 0;
const builders_1 = require("@discordjs/builders");
const discord_config_1 = require("../discord-config");
const CustomConnectionService_1 = require("../music-bot/connection/CustomConnectionService");
class PlayCommand {
    constructor() {
        this.data = new builders_1.SlashCommandBuilder()
            .setName('play')
            .setDescription('Play a song')
            .addStringOption(option => option.setName("song").setDescription("URL or name of the song (YouTube only for song name)"));
    }
    execute(interaction) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const arg = interaction.options.getString(this.data.options[0].name);
            console.log("/play COMMAND Request, User: " + ((_a = interaction.member) === null || _a === void 0 ? void 0 : _a.user.username));
            console.log("GUID:", interaction.member.voice.guild.id);
            if (!arg) {
                yield interaction.reply("No " + this.data.options[0].name + " provided");
                return;
            }
            let connection = CustomConnectionService_1.CustomConnectionService.getVoiceConnection(interaction.member.voice.guild.id);
            try {
                this.checkVoiceChannel(interaction, connection);
            }
            catch (error) {
                return yield interaction.reply(error.message);
            }
            if (!connection) {
                connection = yield CustomConnectionService_1.CustomConnectionService.getOrCreateVoiceConnection(interaction.member.voice.guild.id, interaction.member.voice.channelId, interaction.member.voice.guild.voiceAdapterCreator);
            }
            const response = yield CustomConnectionService_1.CustomConnectionService.play(interaction.member.voice.guild.id, arg);
            console.log("=============================> Response: " + response.getMessage());
            console.log("Cache: ");
            discord_config_1.client.guilds.cache.forEach(e => console.log(e));
            yield interaction.reply(response.getMessage());
        });
    }
    checkVoiceChannel(interaction, connection) {
        var _a;
        const channelId = (_a = interaction.member) === null || _a === void 0 ? void 0 : _a.voice.channelId;
        if (!channelId) {
            throw new Error("You must be in a voice channel");
        }
        if (connection) {
            const connectionChannelId = connection.getConnection().joinConfig.channelId;
            if (connectionChannelId !== channelId) {
                throw new Error("You must be in the same voice channel as the bot");
            }
        }
    }
}
exports.PlayCommand = PlayCommand;
//# sourceMappingURL=PlayCommand.js.map