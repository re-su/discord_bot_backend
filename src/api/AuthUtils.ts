import { NextFunction } from "express";

export default function isAuthenticated(req: any, res: any, next: NextFunction) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401);
    res.send('not logged in :(');
}