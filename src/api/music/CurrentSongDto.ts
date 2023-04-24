import { Song } from "../../music-bot/queue/Song";
import { SongDto } from "./SongDto";

export class CurrentSongDto extends SongDto {
    currentTimestamp: any;

    constructor(song: Song, currentTimestamp: any) {
        super(song);
        this.currentTimestamp = currentTimestamp;
    }
}