import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const bombonSchema = new Schema({
    name: {
        type: String,
        required: [ true, "El nombre es obligatorio" ],
        uppercase: true,
        trim: true,
    },
    //tipo
    gut: {
        type: String,
        required: [ true, "La especie es obligatoria" ],
        uppercase: true,
        trim: true,
    },
    description: {
        type: String,
        required: [ false ],
    },
    price: {
        type: Number,
        required: [ true, "El precio es obligatorio"  ],
    },
    stock: {
        type: Number,
        required: [ true, "El stock es obligatorio" ],
        min: [ 0, "El stock debe ser un valor positivo" ],
    },
    status: {
        type: Boolean,
        required: [ true, "El estado es obligatorio" ],
    },
    thumbnail: {
        type: String,
        required: [ true, "La imagen es obligatoria" ],
        trim: true,
    },
}, {
    timestamps: true, // Añade timestamps para generar createdAt y updatedAt
    versionKey: false, // Elimina el campo __v de versión
});

bombonSchema.pre("deleteOne", async function(next) {
    try {
        const Recipe = model("recipes");

        await Recipe.updateMany(
            { "bombons.bombon": this._id },
            { $pull: { bombons: { bombon: this._id } } },
        );

        next();
    } catch (error) {
        next(error);
    }
});

bombonSchema.plugin(paginate);

const BombonModel = model("bombon", bombonSchema);

export default BombonModel;