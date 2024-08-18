import session from "express-session";
import MongoStore from"connect-mongo";

export const config = (server) => {
    const getSessionOptions = () => {
        return {
            store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
            secret: process.env.SECRET_KEY,
            cookie: { maxAge: 2 * 60 * 60 * 1000 },
            saveUninitialized: false, 
            resave: false,
        };
    };

    server.use(session(getSessionOptions()));
};