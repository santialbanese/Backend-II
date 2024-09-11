import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const ticketSchema = new Schema({
    code: {
        type: String,
        required: [ true, "El codigo es obligatorio" ],
    },
    //tipo
    purchase_datetime: {
        type: String,
        required: [ true, "La especie es obligatoria" ],
    },
    amount: {
        type: Number,
        required: [ true, "El precio es obligatorio"  ],
    },
    purchaser: {
        type: String,
        required: [ true, "es obligatorio" ],
    },
}, {
    timestamps: true, // Añade timestamps para generar createdAt y updatedAt
    versionKey: false, // Elimina el campo __v de versión
});

ticketSchema.plugin(paginate);

const TicketModel = model("ticket", ticketSchema);

export default TicketModel;