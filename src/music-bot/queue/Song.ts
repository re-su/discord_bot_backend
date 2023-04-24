import { AudioResource } from "@discordjs/voice";

export class Song {
    private url: string;
    private title: string;
    private thumbnailUrl: string;
    private resource: AudioResource;
    private id: string;
    private durationInSec: number;

    constructor(url: string, title: string, thumbnailUrl: string, resource: AudioResource, id: string, durationInSec: number) {
        this.url = url;
        this.title = title;
        this.thumbnailUrl = thumbnailUrl;
        this.resource = resource;
        this.id = id;
        this.durationInSec = durationInSec;
    }

    getUrl(): string {
        return this.url;
    }

    setUrl(url: string) {
        this.url = url;
    }

    getTitle(): string {
        return this.title;
    }

    setTitle(title: string) {
        this.title = title;
    }

    getResource(): AudioResource {
        return this.resource;
    }

    setResource(resource: AudioResource) {
        this.resource = resource;
    }

    getThumbnailUrl(): string {
        return this.thumbnailUrl;
    }

    setThumbnailUrl(thumbnailUrl: string) {
        this.thumbnailUrl = thumbnailUrl;
    }

    getId() {
        return this.id;
    }

    getDurationInSec() {
        return this.durationInSec;
    }
}
