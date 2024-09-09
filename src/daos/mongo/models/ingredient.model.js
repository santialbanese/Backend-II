import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const ingredientSchema = new Schema({
    title: {
        type: String,
        required: [ true, "El nombre es obligatorio" ],
        uppercase: true,
        trim: true,
        minLength: [ 3, "El nombre debe tener al menos 3 caracteres" ],
        maxLength: [ 25, "El nombre debe tener como máximo 25 caracteres" ],
        index: { name: "idx_title" },
    },
    description: {
        type: String,
        trim: true,
        maxLength: [ 250, "La descripción debe tener como máximo 250 caracteres" ],
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
}, {
    timestamps: true, // Añade timestamps para generar createdAt y updatedAt
    versionKey: false, // Elimina el campo __v de versión
});

// Middleware que elimina la referencia en los recetas al eliminar el ingrediente.
ingredientSchema.pre("deleteOne", async function(next) {
    try {
        await Recipe.updateMany(
            { "ingredients.ingredient": this._id },
            { $pull: { ingredients: { ingredient: this._id } } },
        );

        next();
    } catch (error) {
        next(error);
    }
});

// Agrega mongoose-paginate-v2 para habilitar las funcionalidades de paginación.
ingredientSchema.plugin(paginate);

const Ingredient = model("ingredients", ingredientSchema);

export default Ingredient;