import fs from "fs";
import path from "path";

export const deleteFile = async (filepath, filename) => {
    validateFilePathAndName(filepath, filename);

    try {
        await fs.promises.unlink(path.join(filepath, filename));
    } catch (error) {
        if (error.code === "ENOENT") {
            console.warn("El archivo no existe.");
        } else {
            throw new Error("Error al eliminar el archivo");
        }
    }
};