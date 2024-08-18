import { Router } from "express";
import UserManager from "../managers/UserManager.js";
import { checkAuthHome, checkLogin, checkAdminRole } from "../middlewares/auth.middleware.js";
import passport from "passport";

const router = Router();
const userManager = new UserManager();

// Ruta de la página de inicio
router.get("/", checkLogin,  async (req, res) => {
    const session = {
        loggedIn: req.isAuthenticated(),
        loggedOut: !req.isAuthenticated(),
    };
    res.status(200).render("home", session);
});

// Ruta de la página de inicio de sesión
router.get("/login", async (req, res) => {
    res.status(200).render("login");
});

router.get("/profile", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const user = req.user; 
        res.status(200).render("profile", user);
    } catch (error) {
        res.status(500).send("Error al cargar el perfil del usuario.");
    }
});

router.get("register", async (req, res) => {
    res.status(200).render("register");
});

router.post("/register", async (req, res) => {
    try {
        const { name, surname, age, email, password } = req.body;
        const userCreated = await userManager.insertOne({ name, surname, age, email, password });
        res.status(200).render("login", { successMessage: "Usuario registrado correctamente" });
    } catch (error) {
        res.status(500).render("register", { errorMessage: error.message });
    }
});

// Ruta de la página protegida por autenticación JWT
router.get("/current", checkAuthHome, async (req, res) => {
    res.status(200).render("current");
});

router.get("/admin", checkAuthHome, checkAdminRole, async (req, res) => {
    res.status(200).render("admin");
});

router.get("/error", async (req, res) => {
    res.status(200).render("error");
});

// Ruta para cerrar sesión
router.get("/logout", (req, res) => {
    // Borra la cookie del token de acceso
    res.clearCookie("cookieToken");
    const session = {
        loggedIn: req.isAuthenticated(),
        loggedOut: !req.isAuthenticated(),
    };
    res.status(200).render("home", session);
});

router.get("/reset-password", async (req, res) => {
    res.status(200).render("resetPassword");
});

router.post("/reset-password", async (req, res) => {
    try {
        const { email, password } = req.body;
        await userManager.resetPasswordByEmail(email, password);
        res.status(200).render("login", { successMessage: "Se ha restaurado tu contraseña correctamente" });
    } catch (error) {
        res.status(500).render("resetPassword", { errorMessage: error.message });
    }
});



export default router;