import {Schema, model} from "mongoose";
import paginate from "mongoose-paginate-v2";
import { STANDARD, ROLES } from "../../.././constants/roles.constant.js";

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
        required: [ true, "El email es obligatorio" ],
        lowercase: true,
        trim: true,
        unique: true,
        validate: {
            validator: async function (email) {
                const countDocuments = await this.model("users").countDocuments({
                    _id: { $ne: this._id },
                    email,
                });
                return countDocuments === 0;
            },
            message: "El email ya está registrado",
        },
    },
    password: {
        type: String,
        required: [true, "la contraseña es obligatorio"],
    },
    roles: {
        type: [String],
        uppercase: true,
        enum: {
            values: ROLES,
            message: "Rol no válido",
        },
        default: [STANDARD],
    },
}, {
    timestamps: true,
});
userSchema.plugin(paginate);

const UserModel = model("users", userSchema);

export default UserModel;