import { Router } from "express";
import passport from "passport";
import { authFailure, authLogout } from "src/controllers/auth.controller";

export const authRouter: Router = Router();

authRouter.get(
    "/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
);

authRouter.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: "/profile",
        failureRedirect: "/auth/failure",
    })
);

authRouter.get("/failure", authFailure);

authRouter.get("/logout", authLogout);
