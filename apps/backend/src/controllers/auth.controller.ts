import { Request, Response } from "express";

export function authFailure(req: Request, res: Response) {
    res.status(401).json({ message: "Authentication failed" });
}
