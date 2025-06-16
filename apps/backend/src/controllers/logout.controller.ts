import { Request, Response } from "express";

export function logout(req: Request, res: Response) {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: "Logout failed" });
        }
        res.status(200).json({ message: "Logged out successfully" });
    });
}
