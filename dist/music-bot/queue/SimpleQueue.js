"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleQueue = void 0;
class SimpleQueue {
    constructor() {
        this.queue = [];
        this.currentSong = undefined;
    }
    addSong(song) {
        this.queue.push(song);
    }
    skipSong() {
        this.currentSong = this.queue[0];
        this.queue.shift();
    }
    getNextSong() {
        return this.queue[0];
    }
    hasNextSong() {
        return this.getNextSong() !== undefined && this.getNextSong() !== null;
    }
    removeSong(song) {
        this.queue = this.queue.filter((s) => s !== song);
    }
    getQueue() {
        return this.queue;
    }
    getQueueSize() {
        return this.queue.length;
    }
    clearQueue() {
        this.queue = [];
    }
    getCurrentSong() {
        return this.currentSong;
    }
    setCurrentSong(currentSong) {
        this.currentSong = currentSong;
    }
    reorderQueue(source, destination) {
        [this.queue[source], this.queue[destination]] = [this.queue[destination], this.queue[source]];
    }
}
exports.SimpleQueue = SimpleQueue;
//# sourceMappingURL=SimpleQueue.js.map