import { AudioPlayer, VoiceConnection } from "@discordjs/voice";
import { SimpleQueue } from "../queue/SimpleQueue";
import { Queue } from "../queue/Queue";

export class CustomConnection {
    connection: VoiceConnection;
    audioPlayer: AudioPlayer;
    playingQueue: Queue;

    constructor(connection: VoiceConnection, audioPlayer: AudioPlayer) {
        this.connection = connection;
        this.audioPlayer = audioPlayer;
        this.playingQueue = new SimpleQueue();
    }

    public getConnection(): VoiceConnection {
        return this.connection;
    }

    public getAudioPlayer(): AudioPlayer {
        return this.audioPlayer;
    }

    public getPlayingQueue(): Queue {
        return this.playingQueue;
    }
}