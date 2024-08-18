import express from "express";
import jwt from "jsonwebtoken";
import UserManager from "../managers/UserManager.js";
import { generateToken, checkAuthHome, checkAdminRole } from "../middlewares/auth.middleware.js";

const router = express.Router();
const userManager = new UserManager();


router.post("/login", generateToken, (req, res) => {
    res.cookie("cookieToken", req.token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true });
    res.status(200).json({ status: true, message: "Has conseguido un Token." });
    if (!token) {
            req.isAuthenticated = () => false;
            return next();
        }

        req.isAuthenticated = () => true;
 
});

router.post("/reset-password", async (req, res) => { 
    try {
        const { email, password } = req.body;
        await userManager.resetPasswordByEmail(email, password);
        res.status(200).json({ status: true });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

export default router;