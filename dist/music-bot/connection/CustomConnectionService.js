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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomConnectionService = void 0;
const NotificationService_1 = require("../../api/notification/NotificationService");
const InteractionResponse_1 = require("../../models/InteractionResponse");
const SongCreatorFactory_1 = require("../song-creators/SongCreatorFactory");
const CustomConnectionFactory_1 = require("./CustomConnectionFactory");
class VoiceConnectionRepository {
    constructor() {
        this.connections = new Map();
    }
    add(guildId, connection) {
        this.connections.set(guildId, connection);
        console.log("Added to the queue: ", this.connections);
    }
    get(guildId) {
        return this.connections.get(guildId);
    }
}
class CustomConnectionService {
    constructor() { }
    static getOrCreateVoiceConnection(guildId, channelId, voiceAdapterCreator) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = this.voiceConnectionRepository.get(guildId);
            if (connection) {
                return connection;
            }
            else {
                const voiceConnection = CustomConnectionFactory_1.CustomConnectionFactory.createVoiceConnection(guildId, channelId, voiceAdapterCreator);
                this.voiceConnectionRepository.add(guildId, voiceConnection);
                return voiceConnection;
            }
        });
    }
    static getVoiceConnection(guildId) {
        return this.voiceConnectionRepository.get(guildId);
    }
    static play(guildId, commandArgument) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const song = yield SongCreatorFactory_1.SongCreatorFactory.getSongCreator(commandArgument).createSong();
                return this.playSong(guildId, song);
            }
            catch (error) {
                console.error(error);
                return new InteractionResponse_1.InteractionResponse("Something went wrong", false);
            }
        });
    }
    static playSong(guildId, song) {
        try {
            const customConnection = this.getVoiceConnection(guildId);
            if (!customConnection) {
                throw new Error("No such connection!");
            }
            const player = customConnection.getAudioPlayer();
            const queue = customConnection.getPlayingQueue();
            if (player.state.status === "playing") {
                queue.addSong(song);
                NotificationService_1.NotificationService.sendQueueEvent(guildId);
                return new InteractionResponse_1.InteractionResponse(`Added ${song.getTitle()} to the queue`, true);
            }
            player.play(song.getResource());
            queue.setCurrentSong(song);
            return new InteractionResponse_1.InteractionResponse(`Playing ${song.getTitle()}`, true);
        }
        catch (error) {
            console.error(error);
            return new InteractionResponse_1.InteractionResponse("Something went wrong", false);
        }
    }
    static skipSong(guildId) {
        const customConnection = this.getVoiceConnection(guildId);
        if (!customConnection) {
            return new InteractionResponse_1.InteractionResponse("Nothing is playing!", false);
        }
        const queue = customConnection.playingQueue;
        const player = customConnection.audioPlayer;
        player.stop();
        if (queue.hasNextSong()) {
            const nextSong = queue.getNextSong();
            return new InteractionResponse_1.InteractionResponse("Skipped! Playing: " + (nextSong === null || nextSong === void 0 ? void 0 : nextSong.getTitle()), true);
        }
        else {
            return new InteractionResponse_1.InteractionResponse("Skipped! Nothing in the queue", true);
        }
    }
    static reorderQueue(guildId, source, destination) {
        const customConnection = this.getVoiceConnection(guildId);
        if (!customConnection) {
            throw new Error("No such connection");
        }
        customConnection.getPlayingQueue().reorderQueue(source, destination);
    }
}
exports.CustomConnectionService = CustomConnectionService;
CustomConnectionService.voiceConnectionRepository = new VoiceConnectionRepository();
//# sourceMappingURL=CustomConnectionService.js.map