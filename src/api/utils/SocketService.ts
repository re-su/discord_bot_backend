import { Server as SocketServer, ServerOptions } from "socket.io";
import { CustomConnection } from "../../music-bot/connection/CustomConnection";
import { CustomConnectionService } from "../../music-bot/connection/CustomConnectionService";
import { Queue } from "../../music-bot/queue/Queue";
import { QueueDto } from "../music/QueueDto";
import { Server as HttpServer } from "http";


export class SocketService {
    private static instance: SocketService;
    private static io: SocketServer;

    private constructor(httpServer: HttpServer, opts?: Partial<ServerOptions>) {
        SocketService.io = new SocketServer(httpServer, opts);
    }

    public static initialize(httpServer: HttpServer, opts?: Partial<ServerOptions>): SocketService {
        if (SocketService.instance) {
            return SocketService.instance;
        } else {
            return new SocketService(httpServer, opts);
        }
    }

    public static getSocketServer(): SocketServer {
        return SocketService.io;
    }

    public static configSocket() {
        // only allow authenticated users
        SocketService.io.use((socket, next) => {
            const req: any = socket.request;
            console.log(req.user);
            if (req.user) {
                next();
            } else {
                next(new Error('unauthorized'))
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

            socket.on('refresh_queue', (data: any) => {
                console.log("Refresh from client", data);
                CustomConnectionService.reorderQueue(data.guildId, data.source, data.destination)

            })

            socket.emit("hello");

            const req: any = socket.request;
            const session = req.session;
            console.log(`saving sid ${socket.id} in session ${session.id}`);
            session.socketId = socket.id;
            session.save();
        });
    }

    public static attachMiddleware(middleware: any) {
        SocketService.io.use(SocketService.wrap(middleware));
    }

    private static sendQueueData(socket: any, guildId: string) {
        const connection: CustomConnection | undefined = CustomConnectionService.getVoiceConnection(guildId);

        if (connection) {
            const queue: Queue = connection.getPlayingQueue();
            const timestamp: any = queue.getCurrentSong()?.getResource().playbackDuration;
            const queueDto: QueueDto = new QueueDto(queue, timestamp);
            socket.emit("refresh_queue", queueDto);
        }
    }

    // convert a connect middleware to a Socket.IO middleware
    private static wrap = (middleware: (arg0: any, arg1: {}, arg2: any) => any) => (socket: { request: any; }, next: any) => middleware(socket.request, {}, next);
}