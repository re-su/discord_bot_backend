import { NotificationService } from "../../api/notification/NotificationService";
import { InteractionResponse } from "../../models/InteractionResponse";
import { Song } from "../queue/Song";
import { SongCreatorFactory } from "../song-creators/SongCreatorFactory";
import { CustomConnection } from "./CustomConnection";
import { CustomConnectionFactory } from "./CustomConnectionFactory";

class VoiceConnectionRepository {
  private connections: Map<string, CustomConnection> = new Map();

  add(guildId: string, connection: CustomConnection) {
    this.connections.set(guildId, connection);
    console.log("Added to the queue: ", this.connections);
  }

  get(guildId: string): CustomConnection | undefined {
    return this.connections.get(guildId);
  }
}

export class CustomConnectionService {
  private static voiceConnectionRepository = new VoiceConnectionRepository();

  private constructor() { }

  static async getOrCreateVoiceConnection(guildId: string, channelId: any, voiceAdapterCreator: any): Promise<CustomConnection> {
    const connection = this.voiceConnectionRepository.get(guildId);
    if (connection) {
      return connection;
    } else {
      const voiceConnection = CustomConnectionFactory.createVoiceConnection(guildId, channelId, voiceAdapterCreator);
      this.voiceConnectionRepository.add(guildId, voiceConnection);
      return voiceConnection;
    }
  }

  static getVoiceConnection(guildId: string): CustomConnection | undefined {
    return this.voiceConnectionRepository.get(guildId);
  }

  static async play(guildId: string, commandArgument: string): Promise<InteractionResponse> {
    try {
      const song: Song = await SongCreatorFactory.getSongCreator(commandArgument).createSong();
      return this.playSong(guildId, song);
    } catch (error) {
      console.error(error);
      return new InteractionResponse("Something went wrong", false);
    }
  }

  static playSong(guildId: string, song: Song): InteractionResponse {
    try {
      const customConnection = this.getVoiceConnection(guildId);
      if (!customConnection) {
        throw new Error("No such connection!");
      }
      const player = customConnection.getAudioPlayer();
      const queue = customConnection.getPlayingQueue();

      if (player.state.status === "playing") {
        queue.addSong(song);
        NotificationService.sendQueueEvent(guildId);
        return new InteractionResponse(`Added ${song.getTitle()} to the queue`, true);
      }

      player.play(song.getResource());
      queue.setCurrentSong(song);

      return new InteractionResponse(`Playing ${song.getTitle()}`, true);
    } catch (error) {
      console.error(error);
      return new InteractionResponse("Something went wrong", false);
    }
  }

  static skipSong(guildId: string): InteractionResponse {
    const customConnection = this.getVoiceConnection(guildId);
    if (!customConnection) {
      return new InteractionResponse("Nothing is playing!", false);
    }

    const queue = customConnection.playingQueue;
    const player = customConnection.audioPlayer;
    player.stop();

    if(queue.hasNextSong()) {
      const nextSong = queue.getNextSong();
      return new InteractionResponse("Skipped! Playing: " + nextSong?.getTitle(), true)  
    } else {
      return new InteractionResponse("Skipped! Nothing in the queue", true);
    }

  }

  static reorderQueue(guildId: string, source: number, destination: number) {
    const customConnection = this.getVoiceConnection(guildId);
    if(!customConnection) {
      throw new Error("No such connection");
    }
    customConnection.getPlayingQueue().reorderQueue(source, destination);
  }
}
