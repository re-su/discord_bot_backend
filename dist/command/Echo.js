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
exports.Echo = void 0;
const discord_js_1 = require("discord.js");
class Echo {
    constructor() {
        this.data = new discord_js_1.SlashCommandBuilder()
            .setName('echo')
            .setDescription('Replies with your input!')
            .addStringOption(option => option.setName("input").setDescription("The input to echo back"));
    }
    // Respond with the input
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const input = interaction.options.getString("input");
            yield interaction.reply(input ? input : "No input provided");
        });
    }
}
exports.Echo = Echo;
//# sourceMappingURL=Echo.js.map