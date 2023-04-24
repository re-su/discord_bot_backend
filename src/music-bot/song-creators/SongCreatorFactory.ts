import { SongCreator } from "./SongCreator";
import { SpotifySongCreator } from "./SpotifySongCreator";
import { YoutubeSongCreator } from "./YoutubeSongCreator";
import { YoutubeSearchSongCreator } from "./YoutubeSearchSongCreator";

export class SongCreatorFactory {
    public static getSongCreator(commandArgument: string): SongCreator {
        if(SongCreatorFactory.isYouTubeUrl(commandArgument)) {
            return new YoutubeSongCreator(commandArgument);
        } else if(SongCreatorFactory.isSpotifyUrl(commandArgument)) {
            return new SpotifySongCreator(commandArgument);
        } else if(SongCreatorFactory.isUrl(commandArgument)) {
            throw new Error("Player for such URL not implemented yet.")
        } else {
            return new YoutubeSearchSongCreator(commandArgument);
        }
    }

    private static isYouTubeUrl(commandArgument: string): boolean {
        return /^https?:\/\/(?:www\.)?(?:youtube(?:-nocookie)?\.com|youtu\.be)/.test(commandArgument);
    }

    private static isSpotifyUrl(commandArgument: string): boolean {
        return /^https?:\/\/(?:open|play)\.spotify\.com/.test(commandArgument);
    }

    static isUrl(commandArgument: string): boolean {
        return RegExp("^(https?\:\/\/)?(.+)\/.+$").test(commandArgument);
    }
}