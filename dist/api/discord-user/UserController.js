"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_config_1 = require("../../discord-config");
class UserController {
}
exports.default = UserController;
UserController.getUserServers = (req, res) => {
    let servers = [];
    req.user.guilds.forEach((server) => {
        const id = server.id;
        const guild = discord_config_1.client.guilds.cache.find((g) => g.id === id);
        if (guild) {
            servers.push(guild);
        }
    });
    res.json(servers);
};
UserController.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};
//# sourceMappingURL=UserController.js.map