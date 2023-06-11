"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = exports.Event = void 0;
const CustomConnectionService_1 = require("../../music-bot/connection/CustomConnectionService");
const QueueDto_1 = require("../music/QueueDto");
const SocketService_1 = require("../socket/SocketService");
var Event;
(function (Event) {
    Event["RefreshQueue"] = "refresh_queue";
})(Event = exports.Event || (exports.Event = {}));
class NotificationService {
    constructor() { }
    static sendQueueEvent(guildId, currentSongTimestamp) {
        const connection = CustomConnectionService_1.CustomConnectionService.getVoiceConnection(guildId);
        if (connection) {
            const queue = connection.getPlayingQueue();
            const queueDto = new QueueDto_1.QueueDto(queue, currentSongTimestamp);
            this.sendEvent(guildId, Event.RefreshQueue, queueDto);
        }
        else {
            throw new Error("Connection not found.");
        }
    }
    static sendEvent(guildId, event, eventData) {
        console.log("SEND EVENT", event);
        SocketService_1.SocketService.getSocketServer().to(guildId).emit(event, eventData);
    }
}
exports.NotificationService = NotificationService;
//# sourceMappingURL=NotificationService.js.map