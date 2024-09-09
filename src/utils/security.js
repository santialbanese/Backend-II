import bcrypt from "bcrypt";

export const createHash = (password) => {
    // Genera un salt (por defecto es 10 rounds)
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(String(password), salt);
};

export const isValidPassword = (password, hash) => {
    return bcrypt.compareSync(String(password), hash);
};