import { Request, Response } from "express";
import { getAllUsers } from "../services/user.service";

export async function allUsersGet(req: Request, res: Response) {
    try {
        const users = await getAllUsers();
        res.status(200).json({ message: "success", users });
    } catch (err) {
        console.error("Error fetching all users:", err);
        res.status(500).json({ error: "Could not fetch users" });
    }
}
