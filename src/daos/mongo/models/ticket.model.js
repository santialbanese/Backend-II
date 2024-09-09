import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const bombonSchema = new Schema({
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
        type: Schema.Types.ObjectId,
        ref: "users",
        required: [ true, "es obligatorio" ],
    },
}, {
    timestamps: true, // Añade timestamps para generar createdAt y updatedAt
    versionKey: false, // Elimina el campo __v de versión
});

bombonSchema.plugin(paginate);

const BombonModel = model("bombon", bombonSchema);

export default BombonModel;