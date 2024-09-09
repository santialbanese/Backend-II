import bcrypt from "bcrypt";

// Crea un hash de una contraseña proporcionada
export const createHash = (password) => {
    // Genera un salt (por defecto es 10 rounds)
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(String(password), salt);
};

// Verifica si una contraseña proporcionada es válida para un usuario
export const isValidPassword = (password, hash) => {
    return bcrypt.compareSync(String(password), hash);
};