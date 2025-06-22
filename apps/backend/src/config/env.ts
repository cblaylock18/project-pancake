import { cleanEnv, str, port } from "envalid";
import dotenv from "dotenv";
dotenv.config();

export const env = cleanEnv(process.env, {
    DATABASE_URL: str(),
    PORT: port({ default: 3000 }),
    FRONTEND_ORIGIN_1: str({ default: "http://localhost:4173" }),
    FRONTEND_ORIGIN_2: str({ default: "http://localhost:5173" }),
    ENVIRONMENT_NAME: str({ default: "development" }),
    AUTH_SECRET: str(),
    AUTH_GITHUB_ID: str(),
    AUTH_GITHUB_SECRET: str(),
    GOOGLE_CLIENT_ID: str(),
    GOOGLE_CLIENT_SECRET: str(),
    SESSION_SECRET: str(),
    BACKEND_URL: str({
        default: "http://localhost:3000",
    }),
    REDIS_URL: str(),
});
