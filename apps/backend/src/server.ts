import express from "express";
import session from "express-session";
import type { Express, RequestHandler } from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { env } from "./env";

import prisma from "./db";

import "./auth"; // Ensure auth is initialized
import passport from "passport";

const isLoggedIn: RequestHandler = (req, res, next) => {
    if (req.user) {
        return next();
    }
    res.status(401).json({ message: "Unauthorized" });
};

export function createServer(): Express {
    const app = express();

    app.use(
        session({
            secret: env.SESSION_SECRET,
            resave: false,
            saveUninitialized: true,
            cookie: {
                maxAge: 24 * 60 * 60 * 1000, // 1 day
            },
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(express.json());

    app.use(helmet());

    const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:4173",
        env.FRONTEND_ORIGIN_1,
        env.FRONTEND_ORIGIN_2,
    ];

    const corsOptions = {
        origin: (
            origin: string | undefined,
            callback: (err: Error | null, allow?: boolean) => void
        ) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
        optionsSuccessStatus: 200,
    };

    app.use(cors(corsOptions));

    const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
    app.use(limiter);

    app.get("/health", (req, res) => {
        res.status(200).json({ message: "OK" });
    });
    app.get("/", async (req, res) => {
        const profiles = await prisma.user.findMany();
        res.status(200).json({ message: "hi from the backend!", profiles });
    });

    app.get("/login", (req, res) => {
        res.send('<a href="/auth/google">Login with Google</a>');
    });

    app.get(
        "/auth/google",
        passport.authenticate("google", { scope: ["email", "profile"] })
    );

    app.get(
        "/google/callback",
        passport.authenticate("google", {
            successRedirect: "/protected",
            failureRedirect: "/auth/failure",
        })
    );

    app.get("/auth/failure", (req, res) => {
        res.status(401).json({ message: "Authentication failed" });
    });

    app.get("/protected", isLoggedIn, (req, res) => {
        // This is a placeholder for protected routes
        res.status(200).json({
            message: "This is a protected route",
            user: req.user,
        });
    });

    app.get("/logout", (req, res) => {
        req.logout((err) => {
            if (err) {
                return res.status(500).json({ message: "Logout failed" });
            }
            res.status(200).json({ message: "Logged out successfully" });
        });
    });

    return app;
}
