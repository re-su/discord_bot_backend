import { Request, Response } from "express";
import { CustomConnection } from "../../music-bot/connection/CustomConnection";
import { CustomConnectionService } from "../../music-bot/connection/CustomConnectionService";
import { Queue } from "../../music-bot/queue/Queue";
import { Song } from "../../music-bot/queue/Song";
import { QueueDto } from "./QueueDto";
import { SongDto } from "./SongDto";

export default class MusicController {
    static about = (req: Request, res: Response) => {
        res.send("ABOUT US!")
    };
}