import { RequestHandler } from "express";

export const isLoggedIn: RequestHandler = (req, res, next) => {
    if (req.user) {
        return next();
    }
    res.status(204).end(); // no error, just "no user"
};
