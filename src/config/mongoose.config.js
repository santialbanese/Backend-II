import { connect, Types } from "mongoose";

export const connectDB = () => { 
    const URI = process.env.MONGODB_URI;

    try {
        connect(URI, { dbName: "Backend2-ejemplo" });
        console.log("Conectado a MongoDB"); 
    } catch (error) {
        console.error("Error al conectar con MongoDB", error.message);
    }
}
export const isValidID = (id) => {
    return Types.ObjectId.isValid(id);
};