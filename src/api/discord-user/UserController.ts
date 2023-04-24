import { Request, Response } from "express";
import {client} from "../../discord-config"

export default class UserController {
    static getUserServers = (req: any, res: Response) => {
        let servers: any = [];
        req.user.guilds.forEach((server: any) => {
            const id = server.id;
            const guild = client.guilds.cache.find((g) => g.id === id);

            if (guild) {
                servers.push(guild)
            }
        });

        res.json(servers);
    };

    static logout = (req: any, res: Response) => {
        req.logout();
        res.redirect('/');
    }
}