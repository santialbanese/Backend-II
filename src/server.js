import express from "express" 
import { config as configHandlebars } from "./config/handlebars.config.js";
import cookieParser from "cookie-parser";
import { config } from "./config/passport.config.js";
import { connectDB } from "./config/mongoose.config.js";
import {config as configDotEnv} from "./config/dotenv.config.js";
import {config as configCORS} from "./config/cors.config.js";


import BombonRouter from "./routers/api/bombon.router.js";
import SessionRouter from "./routers/api/session.router.js";
import UserRouter from "./routers/api/user.routers.js";

const server = express();
configDotEnv();  
 
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cookieParser(process.env.SECRET_KEY))

//Configuración de var de entorno
connectDB();

//CORS
configCORS(server);

//Config de sessions y passport
config(server);

// Configuración del motor de plantillas 
configHandlebars(server); 

//enrutadores
server.use("/api/sessions", new SessionRouter().getRouter());
server.use("/api/users", new UserRouter().getRouter());

//bombones
server.use("/api/bombones", new BombonRouter().getRouter())

// Control de rutas inexistentes
server.use("*", (req, res) => {
    res.status(404).send("<h1>Error 404</h1><h3>La URL indicada no existe en este servidor</h3>");
});

// Control de errores internos
server.use((error, req, res) => {
    console.log("Error:", error.message);
    res.status(500).send("<h1>Error 500</h1><h3>Se ha generado un error en el servidor</h3>");
});

server.listen(process.env.PORT, () => { 
    console.log(`ejecutandose en http://localhost:${process.env.PORT}`)
})   