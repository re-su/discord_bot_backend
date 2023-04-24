import { CustomConnection } from "../../music-bot/connection/CustomConnection";
import { CustomConnectionService } from "../../music-bot/connection/CustomConnectionService";
import { Queue } from "../../music-bot/queue/Queue";
import { QueueDto } from "../music/QueueDto";
import { SocketService } from "../utils/SocketService";

export enum Event {
    RefreshQueue = "refresh_queue"
}

export class NotificationService {
    private constructor() { }

    public static sendQueueEvent(guildId: string, currentSongTimestamp?: number) {
        const connection: CustomConnection | undefined = CustomConnectionService.getVoiceConnection(guildId);

        if(connection) {
            const queue: Queue = connection.getPlayingQueue();
            const queueDto: QueueDto = new QueueDto(queue, currentSongTimestamp);

            this.sendEvent(guildId, Event.RefreshQueue, queueDto);
        } else {
            throw new Error("Connection not found.");
        }
    }

    public static sendEvent(guildId: string, event: Event, eventData: any) {
        console.log("SEND EVENT", event);
        SocketService.getSocketServer().to(guildId).emit(event, eventData);
    }
}