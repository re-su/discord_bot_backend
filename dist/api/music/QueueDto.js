"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueDto = void 0;
const CurrentSongDto_1 = require("./CurrentSongDto");
const SongDto_1 = require("./SongDto");
class QueueDto {
    constructor(queue, timestamp) {
        const currentSong = queue.getCurrentSong();
        this.currentSongDto = currentSong ? new CurrentSongDto_1.CurrentSongDto(currentSong, timestamp) : undefined;
        this.queue = queue.getQueue().map(song => new SongDto_1.SongDto(song));
    }
}
exports.QueueDto = QueueDto;
//# sourceMappingURL=QueueDto.js.map