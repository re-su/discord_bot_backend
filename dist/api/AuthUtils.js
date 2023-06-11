"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401);
    res.send('not logged in :(');
}
exports.default = isAuthenticated;
//# sourceMappingURL=AuthUtils.js.map