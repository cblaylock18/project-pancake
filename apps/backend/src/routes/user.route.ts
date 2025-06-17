import { Router } from "express";
import { isLoggedIn } from "../middleware/isLoggedIn";

export const userRouter: Router = Router();

userRouter.get("/", isLoggedIn, (req, res) => {
    res.json({ user: req.user });
});
