import { Router } from "express";
import { isLoggedIn } from "../middleware/isLoggedIn";
import { allUsersGet } from "../controllers/user.controller";

export const userRouter: Router = Router();

userRouter.get("/", isLoggedIn, (req, res) => {
    res.json({ user: req.user });
});

userRouter.get("/all", allUsersGet);
