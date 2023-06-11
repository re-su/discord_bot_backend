"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YoutubeSongCreator = void 0;
const voice_1 = require("@discordjs/voice");
const play_dl_1 = __importDefault(require("play-dl"));
const UuidUtils_1 = require("../../utils/UuidUtils");
const Song_1 = require("../queue/Song");
class YoutubeSongCreator {
    constructor(commandArgument) {
        this.commandArgument = commandArgument;
    }
    createSong() {
        return __awaiter(this, void 0, void 0, function* () {
            const videoInfo = yield play_dl_1.default.video_info(this.commandArgument);
            const stream = yield play_dl_1.default.stream_from_info(videoInfo);
            const resource = (0, voice_1.createAudioResource)(stream.stream, { inputType: stream.type });
            const title = videoInfo.video_details.title ? videoInfo.video_details.title : "Title undefined";
            const thumbnailUrl = videoInfo.video_details.thumbnails[0].url;
            const random_id = UuidUtils_1.UuidUtils.generateUUID();
            const durationInSec = videoInfo.video_details.durationInSec;
            return new Song_1.Song(this.commandArgument, title, thumbnailUrl, resource, random_id, durationInSec);
        });
    }
}
exports.YoutubeSongCreator = YoutubeSongCreator;
//# sourceMappingURL=YoutubeSongCreator.js.map