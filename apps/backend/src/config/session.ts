import { env } from "./env";

export const sessionConfig = {
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
};
