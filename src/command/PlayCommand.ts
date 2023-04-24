import { SlashCommandBuilder } from '@discordjs/builders';
import { client } from '../discord-config';
import { Command } from '../models/Command';
import { InteractionResponse } from '../models/InteractionResponse';
import { CustomConnection } from '../music-bot/connection/CustomConnection';
import { CustomConnectionService } from '../music-bot/connection/CustomConnectionService';

export class PlayCommand implements Command {
  data: any = new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play a song')
    .addStringOption(option => option.setName("song").setDescription("URL or name of the song (YouTube only for song name)"));

  async execute(interaction: any): Promise<void> {
    const arg: string | null = interaction.options.getString(this.data.options[0].name);

    console.log("/play COMMAND Request, User: " + interaction.member?.user.username);
    console.log("GUID:", interaction.member.voice.guild.id)

    if (!arg) {
      await interaction.reply("No " + this.data.options[0].name + " provided");
      return;
    }

    let connection: CustomConnection | undefined = CustomConnectionService.getVoiceConnection(interaction.member.voice.guild.id);

    try {
      this.checkVoiceChannel(interaction, connection);
    } catch (error: any) {
      return await interaction.reply(error.message);
    }

    if (!connection) {
      connection = await CustomConnectionService.getOrCreateVoiceConnection(
        interaction.member.voice.guild.id,
        interaction.member.voice.channelId,
        interaction.member.voice.guild.voiceAdapterCreator
      );
    }

    const response: InteractionResponse = await CustomConnectionService.play(interaction.member.voice.guild.id, arg);

    console.log("=============================> Response: " + response.getMessage());
    console.log("Cache: ");

    client.guilds.cache.forEach(e => console.log(e))

    await interaction.reply(response.getMessage());
  }

  checkVoiceChannel(interaction: any, connection: CustomConnection | undefined) {
    const channelId = interaction.member?.voice.channelId;

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
