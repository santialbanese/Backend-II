import {Schema, model} from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        uppercase: true,
        trim: true
    },
    surname: {
        type: String,
        required: [true, "El apellido es obligatorio"],
        uppercase: true,
        trim: true
    },
    age: {
        type: Number,
        required: [18, "La edad es obligatoria"],
        min: [18, "La edad minima es de 18 años"],
        max: [100, "La edad minima es de 100 años"]

    },
    email: {
        type: String,
        unique: true,
        required: [true, "El email es obligatorio"],
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "la contraseña es obligatorio"],
    },
    gitHubId: {
        type: String,
        required: false 
    },
    role: {
        type: String,
        required: [true, "El email es obligatorio"],
        lowercase: true,
        trim: true,
        default: "user",
        enum: ["user", "admin"]
    },
}, {
    timestamps: true, // Añade timestamps para generar createdAt y updatedAt
});

const UserModel = model("users", userSchema);

export default UserModel;