import { Router } from "express";
import passport from "passport";
import { authFailure } from "../controllers/auth.controller";
import { env } from "../config/env";

export const authRouter: Router = Router();

authRouter.get(
    "/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
);

authRouter.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: `${env.FRONTEND_ORIGIN_1}`,
        failureRedirect: "/auth/failure", // will need to be updated to frontend route for failure
    })
);

// will need to be updated to frontend route for failure
authRouter.get("/failure", authFailure);
