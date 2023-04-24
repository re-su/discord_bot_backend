import { Song } from "./Song";

export interface Queue {
    queue: any;
    currentSong: Song | undefined;

    addSong(song: Song): void;

    skipSong(): void;

    getNextSong(): Song | undefined;

    hasNextSong(): boolean;

    removeSong(song: Song): void;

    getQueue(): Array<Song>;

    getQueueSize(): number;

    clearQueue(): void;

    getCurrentSong(): Song | undefined;

    setCurrentSong(currentSong: Song): void;

    reorderQueue(source: number, destination: number): void;
}