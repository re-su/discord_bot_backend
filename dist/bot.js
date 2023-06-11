"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_config_1 = require("./discord-config");
const api_config_1 = require("./api-config");
(0, discord_config_1.config)();
(0, api_config_1.apiConfig)(discord_config_1.client);
//# sourceMappingURL=bot.js.map