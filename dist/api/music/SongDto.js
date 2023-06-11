"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongDto = void 0;
class SongDto {
    constructor(song) {
        this.id = song.getId();
        this.title = song.getTitle();
        this.url = song.getUrl();
        this.thumbnailUrl = song.getThumbnailUrl();
        this.durationInSec = song.getDurationInSec();
    }
}
exports.SongDto = SongDto;
//# sourceMappingURL=SongDto.js.map