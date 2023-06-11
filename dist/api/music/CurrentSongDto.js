"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentSongDto = void 0;
const SongDto_1 = require("./SongDto");
class CurrentSongDto extends SongDto_1.SongDto {
    constructor(song, currentTimestamp) {
        super(song);
        this.currentTimestamp = currentTimestamp;
    }
}
exports.CurrentSongDto = CurrentSongDto;
//# sourceMappingURL=CurrentSongDto.js.map