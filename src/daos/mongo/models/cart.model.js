import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const cartSchema = new Schema({
    bombons: [
        {
            bombon: {
                type: Schema.Types.ObjectId,
                ref: "bombon",
                required: [ true, "El ingrediente es obligatorio" ],
            },
            quantity: {
                type: Number,
                required: [ true, "La cantidad es obligatoria" ],
                min: [ 1, "La cantidad debe ser mayor que 0" ],
            },
            _id: false,
        },
    ],
}, {
    timestamps: true, // Añade timestamps para generar createdAt y updatedAt
    versionKey: false, // Elimina el campo __v de versión
});

// Agrega mongoose-paginate-v2 para habilitar las funcionalidades de paginación.
cartSchema.plugin(paginate);

const Cart = model("cart", cartSchema);

export default Cart;