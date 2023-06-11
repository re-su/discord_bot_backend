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
exports.Skip = void 0;
const discord_js_1 = require("discord.js");
const CustomConnectionService_1 = require("../music-bot/connection/CustomConnectionService");
class Skip {
    constructor() {
        this.data = new discord_js_1.SlashCommandBuilder()
            .setName('skip')
            .setDescription('Skips the current song');
    }
    execute(interaction) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Skip command executed");
            const guildId = (_a = interaction === null || interaction === void 0 ? void 0 : interaction.member) === null || _a === void 0 ? void 0 : _a.voice.guild.id;
            const result = CustomConnectionService_1.CustomConnectionService.skipSong(guildId);
            interaction.reply(result.getMessage());
        });
    }
}
exports.Skip = Skip;
//# sourceMappingURL=Skip.js.map