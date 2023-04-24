import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "../models/Command";

export class Echo implements Command {
    data: any = new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Replies with your input!')
        .addStringOption(option => option.setName("input").setDescription("The input to echo back"));


    // Respond with the input
    async execute(interaction: ChatInputCommandInteraction) {
        const input: string | null = interaction.options.getString("input");
        await interaction.reply(input ? input : "No input provided");
    }
}