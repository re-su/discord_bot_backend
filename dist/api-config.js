"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiConfig = void 0;
const cors_1 = __importDefault(require("cors"));
const AuthRouter_1 = __importDefault(require("./api/auth/AuthRouter"));
const MusicRouter_1 = __importDefault(require("./api/music/MusicRouter"));
const UserRouter_1 = __importDefault(require("./api/discord-user/UserRouter"));
const http_1 = __importDefault(require("http"));
const SocketService_1 = require("./api/socket/SocketService");
var DiscordStrategy = require('passport-discord').Strategy;
var express = require('express'), session = require('express-session'), passport = require('passport');
const app = express();
const server = http_1.default.createServer(app);
const apiConfig = function (client) {
    require('dotenv').config(); //initialize dotenv
    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });
    const scopes = ['identify', 'email', 'guilds', 'guilds.join'];
    const prompt = 'consent';
    passport.use(new DiscordStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/api/auth/discord/callback',
        scope: scopes
    }, (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => {
            return done(null, profile);
        });
    }));
    // Enable CORS for all routes
    const corsOptions = {
        optionsSuccessStatus: 200,
        credentials: true
    };
    app.use((0, cors_1.default)(corsOptions));
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost:3001");
        next();
    });
    const session_ = session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false
    });
    app.use(session_);
    app.use(passport.initialize());
    app.use(passport.session());
    app.use('/api/auth', AuthRouter_1.default);
    app.use('/api/music', MusicRouter_1.default);
    app.use('/api/user', UserRouter_1.default);
    SocketService_1.SocketService.initialize(server, {
        cors: {
            origin: "http://localhost:3001",
            credentials: true,
            methods: ["GET", "POST"]
        }
    });
    // // convert a connect middleware to a Socket.IO middleware
    // const wrap = (middleware: (arg0: any, arg1: {}, arg2: any) => any) => (socket: { request: any; }, next: any) => middleware(socket.request, {}, next);
    SocketService_1.SocketService.attachMiddleware(session_);
    SocketService_1.SocketService.attachMiddleware(passport.initialize());
    SocketService_1.SocketService.attachMiddleware(passport.session());
    SocketService_1.SocketService.configSocket();
    // io.use(wrap(session_));
    // io.use(wrap(passport.initialize()));
    // io.use(wrap(passport.session()));
    // // only allow authenticated users
    // io.use((socket, next) => {
    //     const req: any = socket.request;
    //     console.log(req.user);
    //     if (req.user) {
    //       next();
    //     } else {
    //       next(new Error('unauthorized'))
    //     }
    // });
    // io.on('connection', (socket) => {
    //     console.log('User connected');
    //     socket.on('joinRoom', (guildId) => {
    //         socket.join(guildId);
    //         console.log(`User ${socket.id} joined room ${guildId}`);
    //         sendQueueData(socket, guildId);
    //     });
    //     socket.on('disconnect', () => {
    //         console.log('User disconnected');
    //     });
    //     socket.on('refresh_queue', (data) => {
    //         console.log("Refresh from client", data)
    //     })
    //     socket.emit("hello");
    //     const req: any = socket.request;
    //     const session = req.session;
    //     console.log(`saving sid ${socket.id} in session ${session.id}`);
    //     session.socketId = socket.id;
    //     session.save();
    // });
    const PORT = process.env.port || 3000;
    server.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
};
exports.apiConfig = apiConfig;
//# sourceMappingURL=api-config.js.map