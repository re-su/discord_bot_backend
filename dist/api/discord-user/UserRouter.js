"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../discord-user/UserController"));
const AuthUtils_1 = __importDefault(require("../AuthUtils"));
const UserRouter = express_1.default.Router();
// Define servers route that returns all servers the user is a part of
UserRouter.get('/servers', AuthUtils_1.default, UserController_1.default.getUserServers);
// Define logout route that logs out the user and redirects them to the home page
UserRouter.get('/logout', UserController_1.default.logout);
exports.default = UserRouter;
//# sourceMappingURL=UserRouter.js.map