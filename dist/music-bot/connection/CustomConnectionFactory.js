"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomConnectionFactory = void 0;
const voice_1 = require("@discordjs/voice");
const NotificationService_1 = require("../../api/notification/NotificationService");
const CustomConnection_1 = require("./CustomConnection");
const CustomConnectionService_1 = require("./CustomConnectionService");
class CustomConnectionFactory {
    constructor() { }
    static createVoiceConnection(guildId, channelId, voiceAdapterCreator) {
        const connection = (0, voice_1.joinVoiceChannel)({
            channelId: channelId,
            guildId: guildId,
            adapterCreator: voiceAdapterCreator
        });
        const player = (0, voice_1.createAudioPlayer)();
        connection.subscribe(player);
        const customConnection = new CustomConnection_1.CustomConnection(connection, player);
        CustomConnectionFactory.attachConnectionListeners(connection);
        CustomConnectionFactory.attachPlayerListeners(customConnection, player, guildId);
        return customConnection;
    }
    static attachConnectionListeners(connection) {
        connection.on("stateChange", (oldState, newState) => {
            console.log(`Connection ${connection.joinConfig.guildId} moved from ${oldState.status} to ${newState.status}`);
        });
        connection.on("error", (error) => {
            console.error(`Connection ${connection.joinConfig.guildId} had an error: ${error.message}`);
        });
        const networkStateChangeHandler = (oldNetworkState, newNetworkState) => {
            const newUdp = Reflect.get(newNetworkState, 'udp');
            clearInterval(newUdp === null || newUdp === void 0 ? void 0 : newUdp.keepAliveInterval);
        };
        connection.on('stateChange', (oldState, newState) => {
            const oldNetworking = Reflect.get(oldState, 'networking');
            const newNetworking = Reflect.get(newState, 'networking');
            oldNetworking === null || oldNetworking === void 0 ? void 0 : oldNetworking.off('stateChange', networkStateChangeHandler);
            newNetworking === null || newNetworking === void 0 ? void 0 : newNetworking.on('stateChange', networkStateChangeHandler);
        });
    }
    static attachPlayerListeners(connection, player, guildId) {
        player.on("stateChange", (oldState, newState) => {
            console.log(`Player ${guildId} moved from ${oldState.status} to ${newState.status}`);
        });
        player.on("error", (error) => {
            console.error(`Player ${guildId} had an error: ${error.message}`);
        });
        player.on("idle", () => {
            console.log("Player is idle");
            const queue = connection.getPlayingQueue();
            const nextSong = queue.getNextSong();
            queue.skipSong();
            NotificationService_1.NotificationService.sendQueueEvent(guildId, 0);
            if (nextSong) {
                CustomConnectionService_1.CustomConnectionService.playSong(guildId, nextSong);
            }
        });
        player.on("playing", () => {
            var _a;
            console.log("Player in playing state");
            NotificationService_1.NotificationService.sendQueueEvent(guildId, (_a = connection.getPlayingQueue().getCurrentSong()) === null || _a === void 0 ? void 0 : _a.getResource().playbackDuration);
        });
    }
}
exports.CustomConnectionFactory = CustomConnectionFactory;
//# sourceMappingURL=CustomConnectionFactory.js.map