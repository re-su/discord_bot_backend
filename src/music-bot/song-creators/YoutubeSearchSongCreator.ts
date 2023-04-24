import { AudioResource, createAudioResource } from "@discordjs/voice";
import Play, { YouTubeVideo } from "play-dl";
import { UuidUtils } from "../../utils/UuidUtils";
import { Song } from "../queue/Song";
import { SongCreator } from "./SongCreator";

export class YoutubeSearchSongCreator implements SongCreator {
    commandArgument: string;

    constructor(commandArgument: string) {
        this.commandArgument = commandArgument;
    }


    async createSong(): Promise<Song> {
        const youtubeVideos: YouTubeVideo[] = await Play.search(this.commandArgument, {
            source: {
                youtube: 'video'
            }
        });

        if (youtubeVideos.length === 0) {
            throw new Error("Such video was not found on YouTube.");
        }

        const videoInfo = await Play.video_info(youtubeVideos[0].url)
        
        const stream = await Play.stream_from_info(videoInfo);
        const resource: AudioResource = createAudioResource(stream.stream, { inputType: stream.type });
        const title: string = videoInfo.video_details.title ? videoInfo.video_details.title : "Title undefined";
        const thumbnailUrl: string = videoInfo.video_details.thumbnails[0].url;
        const random_id = UuidUtils.generateUUID();
        const durationInSec: number = videoInfo.video_details.durationInSec;

        return new Song(videoInfo.video_details.url, title, thumbnailUrl, resource, random_id, durationInSec);
    }
}