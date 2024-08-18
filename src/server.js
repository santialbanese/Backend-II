import express from "express" 
import usersRouter from "./routes/api.users.routes.js";
import homeRouter from "./routes/home.routes.js";
import { connectDB } from "./config/mongoose.config.js"
import { config as configHandlebars } from "./config/handlebars.config.js";
import cookieParser from "cookie-parser";
import { config } from "./config/passport.config.js";
import {config as dotenvConfig} from "dotenv";
import paths from "./utils/paths.js";
import apiAuthRouter from "./routes/api.auth.routes.js";

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cookieParser(process.env.SECRET_KEY))

//Configuración de var de entorno
dotenvConfig({ path: paths.env });

//conecto con mongodb
connectDB();

//Config de sessions y passport
config(server);

// Configuración del motor de plantillas 
configHandlebars(server); 

//enrutadores
server.use("/", homeRouter);
server.use("/api/users", usersRouter);
server.use("/api/auth", apiAuthRouter);


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