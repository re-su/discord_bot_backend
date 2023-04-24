import cors from 'cors';
import { Application } from 'express';
import AuthRouter from './api/auth/AuthRouter';
import MusicRouter from './api/music/MusicRouter';
import UserRouter from './api/discord-user/UserRouter';
import { CustomClient } from './models/CustomClient';
import http from 'http';
import { SocketService } from './api/utils/SocketService';

var DiscordStrategy = require('passport-discord').Strategy;
var express = require('express')
    , session = require('express-session')
    , passport = require('passport');

const app: Application = express();
const server = http.createServer(app);

const apiConfig = function (client: CustomClient) {
    require('dotenv').config(); //initialize dotenv

    passport.serializeUser(function (user: any, done: (arg0: null, arg1: any) => void) {
        done(null, user);
    });
    passport.deserializeUser(function (obj: any, done: (arg0: null, arg1: any) => void) {
        done(null, obj);
    });

    const scopes = ['identify', 'email', 'guilds', 'guilds.join'];
    const prompt = 'consent';

    passport.use(new DiscordStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/api/auth/discord/callback',
        scope: scopes
    }, (accessToken: any, refreshToken: any, profile: any, done: (arg0: any, arg1: any) => any) => {
        process.nextTick(() => {
            return done(null, profile);
        });
    }));

    // Enable CORS for all routes
    const corsOptions = {
        optionsSuccessStatus: 200,
        credentials: true
    }
    app.use(cors(corsOptions));

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
    app.use('/api/auth', AuthRouter);
    app.use('/api/music', MusicRouter);
    app.use('/api/user', UserRouter);

    SocketService.initialize(server, {
        cors: {
            origin: "http://localhost:3001",
            credentials: true,
            methods: ["GET", "POST"]
        }
    })
    // // convert a connect middleware to a Socket.IO middleware
    // const wrap = (middleware: (arg0: any, arg1: {}, arg2: any) => any) => (socket: { request: any; }, next: any) => middleware(socket.request, {}, next);
    SocketService.attachMiddleware(session_);
    SocketService.attachMiddleware(passport.initialize());
    SocketService.attachMiddleware(passport.session());
    SocketService.configSocket();

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
}


export { apiConfig }