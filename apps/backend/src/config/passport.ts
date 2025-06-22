import passport, { Profile } from "passport";
import {
    Strategy as GoogleStrategy,
    VerifyCallback,
} from "passport-google-oauth2";
import { env } from "./env";
import prisma from "./db";
import type { User } from "@shared/types";

passport.use(
    new GoogleStrategy(
        {
            clientID: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${env.BACKEND_URL}/auth/google/callback`,
            passReqToCallback: true,
        },
        async function (
            req: Express.Request,
            accessToken: string,
            refreshToken: string,
            profile: Profile,
            done: VerifyCallback
        ) {
            try {
                const user = await prisma.user.upsert({
                    where: { googleId: profile.id },
                    update: {
                        // if they already exist, make sure email is up to date
                        email: profile.emails?.[0]?.value,
                    },
                    create: {
                        // if they don’t exist, create them
                        googleId: profile.id,
                        email: profile.emails?.[0]?.value ?? "",
                        username: profile.displayName,
                    },
                });
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (
    user: false | User | null | undefined,
    done
) {
    done(null, user);
});
