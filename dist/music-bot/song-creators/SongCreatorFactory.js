"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongCreatorFactory = void 0;
const SpotifySongCreator_1 = require("./SpotifySongCreator");
const YoutubeSongCreator_1 = require("./YoutubeSongCreator");
const YoutubeSearchSongCreator_1 = require("./YoutubeSearchSongCreator");
class SongCreatorFactory {
    static getSongCreator(commandArgument) {
        if (SongCreatorFactory.isYouTubeUrl(commandArgument)) {
            return new YoutubeSongCreator_1.YoutubeSongCreator(commandArgument);
        }
        else if (SongCreatorFactory.isSpotifyUrl(commandArgument)) {
            return new SpotifySongCreator_1.SpotifySongCreator(commandArgument);
        }
        else if (SongCreatorFactory.isUrl(commandArgument)) {
            throw new Error("Player for such URL not implemented yet.");
        }
        else {
            return new YoutubeSearchSongCreator_1.YoutubeSearchSongCreator(commandArgument);
        }
    }
    static isYouTubeUrl(commandArgument) {
        return /^https?:\/\/(?:www\.)?(?:youtube(?:-nocookie)?\.com|youtu\.be)/.test(commandArgument);
    }
    static isSpotifyUrl(commandArgument) {
        return /^https?:\/\/(?:open|play)\.spotify\.com/.test(commandArgument);
    }
    static isUrl(commandArgument) {
        return RegExp("^(https?\:\/\/)?(.+)\/.+$").test(commandArgument);
    }
}
exports.SongCreatorFactory = SongCreatorFactory;
//# sourceMappingURL=SongCreatorFactory.js.map