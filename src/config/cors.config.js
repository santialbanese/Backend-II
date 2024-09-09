import cors from "cors";

export const config = (server) => {
    server.use(cors({
        origin: process.env.FRONTEND_HOST, 
        methods: "GET,PUT,POST,DELETE", 
    }));
};