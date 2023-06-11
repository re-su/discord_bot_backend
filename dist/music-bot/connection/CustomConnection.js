"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomConnection = void 0;
const SimpleQueue_1 = require("../queue/SimpleQueue");
class CustomConnection {
    constructor(connection, audioPlayer) {
        this.connection = connection;
        this.audioPlayer = audioPlayer;
        this.playingQueue = new SimpleQueue_1.SimpleQueue();
    }
    getConnection() {
        return this.connection;
    }
    getAudioPlayer() {
        return this.audioPlayer;
    }
    getPlayingQueue() {
        return this.playingQueue;
    }
}
exports.CustomConnection = CustomConnection;
//# sourceMappingURL=CustomConnection.js.map