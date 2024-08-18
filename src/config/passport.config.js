import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import UserManager from "../managers/UserManager.js";

const userManager = new UserManager();

const extractCookie = (req) => {
    if (req.cookies) {
        return req.cookies["cookieToken"];
    }

    return null;
};

const getJwtOptions = () => {
    return {
        jwtFromRequest: ExtractJwt.fromExtractors([extractCookie]),
        secretOrKey: process.env.SECRET_KEY,
    };
};

const handleLogin = async (payload, done) => {
    try {
        const user = await userManager.getOneById(payload.id);
        return done(null, user);
    } catch (error) {
        return done(null, false, { message: error.message });
    }
};

export const config = (server) => {
    passport.use("jwt", new JwtStrategy(getJwtOptions(), handleLogin));

    passport.serializeUser((user, done) => {
        const sessionData = {
            id: user._id?.toString(),
            name: user.name,
        };
        done(null, sessionData);
    });

    passport.deserializeUser(async (sessionData, done) => {
        try {
            const user = await userManager.getOneById(sessionData.id);
            done(null, user);
        } catch (error) {
            done(error.message);
        }
    });

    server.use(passport.initialize());
};