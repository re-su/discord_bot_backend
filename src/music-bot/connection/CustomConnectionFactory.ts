import { createAudioPlayer, joinVoiceChannel, VoiceConnection, VoiceConnectionState, VoiceConnectionStatus } from "@discordjs/voice";
import { NotificationService } from "../../api/notification/NotificationService";
import { Song } from "../queue/Song";
import { CustomConnection } from "./CustomConnection";
import { CustomConnectionService } from "./CustomConnectionService";

export class CustomConnectionFactory {
    private constructor() { }

    public static createVoiceConnection(guildId: string, channelId: any, voiceAdapterCreator: any): CustomConnection {
        const connection = joinVoiceChannel({
            channelId: channelId,
            guildId: guildId,
            adapterCreator: voiceAdapterCreator
        });
        const player = createAudioPlayer();
        connection.subscribe(player);
        const customConnection = new CustomConnection(connection, player);
        CustomConnectionFactory.attachConnectionListeners(connection);
        CustomConnectionFactory.attachPlayerListeners(customConnection, player, guildId);
        return customConnection;
    }

    private static attachConnectionListeners(connection: VoiceConnection) {
        connection.on("stateChange", (oldState, newState) => {
            console.log(`Connection ${connection.joinConfig.guildId} moved from ${oldState.status} to ${newState.status}`);
        });
        connection.on("error", (error) => {
            console.error(`Connection ${connection.joinConfig.guildId} had an error: ${error.message}`);
        });

        const networkStateChangeHandler = (oldNetworkState: any, newNetworkState: any) => {
            const newUdp = Reflect.get(newNetworkState, 'udp');
            clearInterval(newUdp?.keepAliveInterval);
        }

        connection.on('stateChange', (oldState, newState) => {
            const oldNetworking = Reflect.get(oldState, 'networking');
            const newNetworking = Reflect.get(newState, 'networking');

            oldNetworking?.off('stateChange', networkStateChangeHandler);
            newNetworking?.on('stateChange', networkStateChangeHandler);
        });
    }

    private static attachPlayerListeners(connection: CustomConnection, player: any, guildId: string) {
        player.on("stateChange", (oldState: any, newState: any) => {
            console.log(`Player ${guildId} moved from ${oldState.status} to ${newState.status}`);
        });

        player.on("error", (error: any) => {
            console.error(`Player ${guildId} had an error: ${error.message}`);
        });

        player.on("idle", () => {
            console.log("Player is idle");
            const queue = connection.getPlayingQueue();
            const nextSong: Song | undefined = queue.getNextSong();
            queue.skipSong();
            NotificationService.sendQueueEvent(guildId, 0);
            if (nextSong) {
                CustomConnectionService.playSong(guildId, nextSong);
            }
        });

        player.on("playing", () => {
            console.log("Player in playing state");
            NotificationService.sendQueueEvent(guildId, connection.getPlayingQueue().getCurrentSong()?.getResource().playbackDuration)
        })
    }
}