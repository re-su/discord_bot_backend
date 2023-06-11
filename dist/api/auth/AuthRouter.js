"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const AuthRouter = express_1.default.Router();
// Define auth routes using passport and redirect user based on success or failure
AuthRouter.get('/discord', passport_1.default.authenticate('discord'));
AuthRouter.get('/discord/callback', passport_1.default.authenticate('discord', {
    failureRedirect: '/'
}), function (req, res) {
    res.redirect('http://localhost:3001/servers'); // Successful auth
});
exports.default = AuthRouter;
//# sourceMappingURL=AuthRouter.js.map