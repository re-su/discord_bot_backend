import { SlashCommandBuilder } from "discord.js";
import { Command } from "../models/Command";
import { InteractionResponse } from "../models/InteractionResponse";
import { CustomConnectionService } from "../music-bot/connection/CustomConnectionService";

export class Skip implements Command {
    data: any = new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skips the current song');

    async execute(interaction: any) {
        console.log("Skip command executed");
        const guildId = interaction?.member?.voice.guild.id;
        const result: InteractionResponse = CustomConnectionService.skipSong(guildId);
        interaction.reply(result.getMessage());
    }
}