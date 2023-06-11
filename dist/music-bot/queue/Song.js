"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Song = void 0;
class Song {
    constructor(url, title, thumbnailUrl, resource, id, durationInSec) {
        this.url = url;
        this.title = title;
        this.thumbnailUrl = thumbnailUrl;
        this.resource = resource;
        this.id = id;
        this.durationInSec = durationInSec;
    }
    getUrl() {
        return this.url;
    }
    setUrl(url) {
        this.url = url;
    }
    getTitle() {
        return this.title;
    }
    setTitle(title) {
        this.title = title;
    }
    getResource() {
        return this.resource;
    }
    setResource(resource) {
        this.resource = resource;
    }
    getThumbnailUrl() {
        return this.thumbnailUrl;
    }
    setThumbnailUrl(thumbnailUrl) {
        this.thumbnailUrl = thumbnailUrl;
    }
    getId() {
        return this.id;
    }
    getDurationInSec() {
        return this.durationInSec;
    }
}
exports.Song = Song;
//# sourceMappingURL=Song.js.map