import { Queue } from "../../music-bot/queue/Queue";
import { Song } from "../../music-bot/queue/Song";
import { CurrentSongDto } from "./CurrentSongDto";
import { SongDto } from "./SongDto";

export class QueueDto {
    currentSongDto: SongDto | undefined;
    queue: Array<SongDto>;

    constructor(queue: Queue, timestamp?: number) {
        const currentSong: Song | undefined = queue.getCurrentSong();
        this.currentSongDto = currentSong ? new CurrentSongDto(currentSong, timestamp) : undefined;
        this.queue = queue.getQueue().map(song => new SongDto(song));
    }
}