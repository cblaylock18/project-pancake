import { env } from "./env";

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:4173",
    env.FRONTEND_ORIGIN_1,
    env.FRONTEND_ORIGIN_2,
];

export const corsOptions = {
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
