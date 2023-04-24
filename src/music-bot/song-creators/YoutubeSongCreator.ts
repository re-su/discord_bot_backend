import { AudioResource, createAudioResource } from "@discordjs/voice";
import Play from "play-dl";
import { UuidUtils } from "../../utils/UuidUtils";
import { Song } from "../queue/Song";
import { SongCreator } from "./SongCreator";

export class YoutubeSongCreator implements SongCreator {
    commandArgument: string;

    constructor(commandArgument: string) {
        this.commandArgument = commandArgument;
    }

    async createSong(): Promise<Song> {
        const videoInfo = await Play.video_info(this.commandArgument)
        const stream = await Play.stream_from_info(videoInfo)
        const resource: AudioResource = createAudioResource(stream.stream, { inputType: stream.type });
        const title: string = videoInfo.video_details.title ? videoInfo.video_details.title : "Title undefined";
        const thumbnailUrl: string = videoInfo.video_details.thumbnails[0].url;
        const random_id: string = UuidUtils.generateUUID();
        const durationInSec: number = videoInfo.video_details.durationInSec;
        return new Song(this.commandArgument, title, thumbnailUrl, resource, random_id, durationInSec);
    }
}
