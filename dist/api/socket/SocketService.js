"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketService = void 0;
const socket_io_1 = require("socket.io");
const CustomConnectionService_1 = require("../../music-bot/connection/CustomConnectionService");
const QueueDto_1 = require("../music/QueueDto");
class SocketService {
    constructor(httpServer, opts) {
        SocketService.io = new socket_io_1.Server(httpServer, opts);
    }
    static initialize(httpServer, opts) {
        if (SocketService.instance) {
            return SocketService.instance;
        }
        else {
            return new SocketService(httpServer, opts);
        }
    }
    static getSocketServer() {
        return SocketService.io;
    }
    static configSocket() {
        // only allow authenticated users
        SocketService.io.use((socket, next) => {
            const req = socket.request;
            console.log(req.user);
            if (req.user) {
                next();
            }
            else {
                next(new Error('unauthorized'));
            }
        });
        SocketService.io.on('connection', (socket) => {
            console.log('User connected');
            socket.on('joinRoom', (guildId) => {
                socket.join(guildId);
                console.log(`User ${socket.id} joined room ${guildId}`);
                SocketService.sendQueueData(socket, guildId);
            });
            socket.on('disconnect', () => {
                console.log('User disconnected');
            });
            socket.on('refresh_queue', (data) => {
                console.log("Refresh from client", data);
                CustomConnectionService_1.CustomConnectionService.reorderQueue(data.guildId, data.source, data.destination);
            });
            socket.emit("hello");
            const req = socket.request;
            const session = req.session;
            console.log(`saving sid ${socket.id} in session ${session.id}`);
            session.socketId = socket.id;
            session.save();
        });
    }
    static attachMiddleware(middleware) {
        SocketService.io.use(SocketService.wrap(middleware));
    }
    static sendQueueData(socket, guildId) {
        var _a;
        const connection = CustomConnectionService_1.CustomConnectionService.getVoiceConnection(guildId);
        if (connection) {
            const queue = connection.getPlayingQueue();
            const timestamp = (_a = queue.getCurrentSong()) === null || _a === void 0 ? void 0 : _a.getResource().playbackDuration;
            const queueDto = new QueueDto_1.QueueDto(queue, timestamp);
            socket.emit("refresh_queue", queueDto);
        }
    }
}
exports.SocketService = SocketService;
// convert a connect middleware to a Socket.IO middleware
SocketService.wrap = (middleware) => (socket, next) => middleware(socket.request, {}, next);
//# sourceMappingURL=SocketService.js.map