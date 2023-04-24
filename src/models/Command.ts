import { SlashCommandBuilder } from "discord.js";

export interface Command {
    data: any;
    execute(interaction: any): Promise<void>;
}