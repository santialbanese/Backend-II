import { Command } from "commander";
import dotenv from "dotenv";
import paths from "../utils/paths.js";

const program = new Command();

export const config = () => {
    program
        .option("-e, --env <string>", "Especificar el entorno", "DEV")
        .parse(process.argv);

    const options = program.opts();

    dotenv.config({
        path: (options.env === "PROD" ? paths.env.prod : paths.env.dev),
    });
};