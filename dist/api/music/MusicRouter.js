"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MusicController_1 = __importDefault(require("./MusicController"));
const MusicRouter = express_1.default.Router();
MusicRouter.get("/about", MusicController_1.default.about);
exports.default = MusicRouter;
//# sourceMappingURL=MusicRouter.js.map