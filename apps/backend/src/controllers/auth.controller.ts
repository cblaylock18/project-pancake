import { Request, Response } from "express";

export function authFailure(req: Request, res: Response) {
    res.status(401).json({ message: "Authentication failed" });
}

export function authLogout(req: Request, res: Response) {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: "Logout failed" });
        }
        res.status(200).json({ message: "Logged out successfully" });
    });
}
