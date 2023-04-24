import { AudioResource } from "@discordjs/voice";
import { Song } from "../queue/Song";
import { SongCreator } from "./SongCreator";

export class SpotifySongCreator implements SongCreator {
    commandArgument: string;
    
    constructor(commandArgument: string) {
        this.commandArgument = commandArgument;
    }

    async createSong(): Promise<Song> {
        throw new Error("Spotify not implemented yet");
    }
}