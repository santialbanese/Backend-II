/* import { Server } from "socket.io";
import BombonService from "../services/bombon.service.js";
import { writeFile } from "../utils/fileSystem.js";
import paths from "../utils/paths.js";
import { generateNameForFile } from "../utils/random.js";

const bombonService = new BombonService();
let serverSocket = null;

// Configura el servidor Socket
export const config = (serverHTTP) => {
    // Crea una nueva instancia de Server con el servidor HTTP proporcionado
    serverSocket = new Server(
        serverHTTP,
        {
            maxHttpBufferSize: 5e6, // Permitir archivos hasta 5MB (por defecto es 1MB)
        },
    );

    // Escucha el evento de conexión de un nuevo socket
    serverSocket.on("connection", async (socket) => {
        const response = await bombonService.findAll({ limit: 100 });
        console.log("Socket connected");

        // Envía la lista de bombones al cliente que se conecta
        serverSocket.emit("bombons-list", response);

        // Escucha el evento para insertar un nuevo bombon
        socket.on("insert-bombon", async (data) => {
            if (data?.file) {
                const filename = generateNameForFile(data.file.name);
                await writeFile(paths.images, filename, data.file.buffer);

                await bombonService.insertOne(data, filename);
                const response = await bombonService.findAll({ limit: 100 });

                // Envía la lista de bombones actualizada después de insertar
                serverSocket.emit("bombons-list", response);
            }
        });

        // Escucha el evento para eliminar un bombone
        socket.on("delete-bombon", async (data) => {
            await bombonService.deleteOneById(data.id);
            const response = await bombonService.findAll({ limit: 100 });

            // Envía la lista de bombones actualizada después de eliminar
            serverSocket.emit("bombons-list", response);
        });
    });
};

// Función para actualizar la lista de bombones
export const updateBombonsList = async () => {
    const response = await bombonService.findAll({ limit: 100 });

    // Envía la lista de bombones actualizada
    serverSocket.emit("bombons-list", { response });
}; */