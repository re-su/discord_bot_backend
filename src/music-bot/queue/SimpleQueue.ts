import { Queue } from "./Queue";
import { Song } from "./Song";

export class SimpleQueue implements Queue {
    queue: Array<Song> = [];
    currentSong: Song | undefined = undefined;

    public addSong(song: Song) {
        this.queue.push(song);
    }

    public skipSong(): void {
        this.currentSong = this.queue[0];
        this.queue.shift();
    }

    public getNextSong(): Song | undefined {
        return this.queue[0];
    }

    public hasNextSong(): boolean {
        return this.getNextSong() !== undefined && this.getNextSong() !== null;
    }

    public removeSong(song: Song) {
        this.queue = this.queue.filter((s) => s !== song);
    }

    public getQueue(): Array<Song> {
        return this.queue;
    }

    public getQueueSize(): number {
        return this.queue.length;
    }

    public clearQueue() {
        this.queue = [];
    }

    public getCurrentSong(): Song | undefined {
        return this.currentSong;
    }

    public setCurrentSong(currentSong: Song) {
        this.currentSong = currentSong;
    }

    public reorderQueue(source: number, destination: number) {
        [this.queue[source], this.queue[destination]] = [this.queue[destination], this.queue[source]];
    }
}