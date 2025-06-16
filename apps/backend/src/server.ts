// Express and relevant types
import express from "express";
import type { Express } from "express";

// Sessions and config to handle user sessions
import session from "express-session";
import { sessionConfig } from "./config/session";

// Security and CORS middleware
import helmet from "helmet";
import cors from "cors";
import { corsOptions } from "./config/cors";
import { limiter } from "./config/limiter";

// Import passport configuration to initialize authentication strategies
import "./config/passport";
import passport from "passport";

// Import routes to handle different endpoints
import { mountRoutes } from "./routes";

// Import Prisma client for database interactions
import prisma from "./config/db";

export function createServer(): Express {
    const app = express();
    app.use(express.json());
    app.use(session(sessionConfig));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(helmet());
    app.use(cors(corsOptions));
    app.use(limiter);

    mountRoutes(app);

    // Health check route to verify server status
    app.get("/health", (req, res) => {
        res.status(200).json({ message: "OK" });
    });

    // Example route to fetch user profiles, excluding a specific email
    app.get("/", async (req, res) => {
        const profiles = await prisma.user.findMany({
            where: { NOT: { email: "cblaylock18@gmail.com" } },
        });
        res.status(200).json({ message: "hi from the backend!", profiles });
    });

    // this is a test route for google auth for backend only
    app.get("/login", (req, res) => {
        res.send('<a href="/auth/google">Login with Google</a>');
    });

    return app;
}
