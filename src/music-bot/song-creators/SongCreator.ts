import { Song } from "../queue/Song";

export interface SongCreator {
    commandArgument: string;
    createSong(): Promise<Song>
}