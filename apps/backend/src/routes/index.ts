import type { Express } from "express";
import { authRouter } from "./auth.route";
import { userRouter } from "./user.route";
import { logoutRouter } from "./logout.route";

export function mountRoutes(app: Express) {
    app.use("/auth", authRouter);
    app.use("/logout", logoutRouter);
    app.use("/profile", userRouter);
}
