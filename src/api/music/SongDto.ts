import { Song } from "../../music-bot/queue/Song";

export class SongDto {
    id: string;
    title: string;
    url: string;
    thumbnailUrl: string;
    durationInSec: number;

    constructor(song: Song) {
        this.id = song.getId();
        this.title = song.getTitle();
        this.url= song.getUrl();
        this.thumbnailUrl = song.getThumbnailUrl();
        this.durationInSec = song.getDurationInSec();
    }
}