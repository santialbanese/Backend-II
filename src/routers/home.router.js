import BaseRouter from "./base.router.js";
import { STANDARD, ADMIN } from "../constants/roles.constant.js"; // Puedes agregar roles como ADMIN si los necesitas
import UserRouter from "./api/user.routers.js";

export default class HomeRouter extends BaseRouter {
    #userRouter;

    constructor() {
        super();
        this.#userRouter = new UserRouter();
        this.initialize();
    }

    initialize() {
        const router = this.getRouter();

        // Define las rutas y asocia las funciones correspondientes
        this.addGetRoute("/", [], (req, res) => this.#getHome(req, res));
        this.addGetRoute("/login", [], (req, res) => this.#getLogin(req, res));
        this.addGetRoute("/profile", [STANDARD], (req, res) => this.#getProfile(req, res));
        this.addGetRoute("/register", [], (req, res) => this.#getRegister(req, res));
        this.addPostRoute("/register", [], (req, res) => this.#postRegister(req, res));
        this.addGetRoute("/current", [STANDARD], (req, res) => this.#getCurrent(req, res));
        this.addGetRoute("/admin", [ADMIN, STANDARD], (req, res) => this.#getAdmin(req, res));
        this.addGetRoute("/error", [], (req, res) => this.#getError(req, res));
        this.addGetRoute("/logout", [STANDARD], (req, res) => this.#getLogout(req, res));
        this.addGetRoute("/reset-password", [], (req, res) => this.#getResetPassword(req, res));
        this.addPostRoute("/reset-password", [], (req, res) => this.#postResetPassword(req, res));

        // Middleware para manejar errores
        router.use((err, req, res, next) => {
            res.sendError(err);
        }); 
    }
 
    async #getHome(req, res) {
        const session = {
            loggedIn: req.isAuthenticated(),
            loggedOut: !req.isAuthenticated(),
        };
        res.status(200).render("home", session);
    }

    async #getLogin(req, res) {
        res.status(200).render("login");
    }

    async #getProfile(req, res) {
        try {
            const user = req.user;
            res.status(200).render("profile", user);
        } catch (error) {
            res.status(500).send("Error al cargar el perfil del usuario.");
        }
    }

    async #getRegister(req, res) {
        res.status(200).render("register");
    }

    async #postRegister(req, res) {
        try {
            const { name, surname, age, email, password } = req.body;
            const userCreated = await this.#userRouter.insertOne({ name, surname, age, email, password });
            res.status(200).render("login", { successMessage: "Usuario registrado correctamente" });
        } catch (error) {
            res.status(500).render("register", { errorMessage: error.message });
        }
    }

    async #getCurrent(req, res) {
        res.status(200).render("current");
    }

    async #getAdmin(req, res) {
        res.status(200).render("admin");
    }

    async #getError(req, res) {
        res.status(200).render("error");
    }

    async #getLogout(req, res) {
        res.clearCookie("cookieToken");
        const session = {
            loggedIn: req.isAuthenticated(),
            loggedOut: !req.isAuthenticated(),
        };
        res.status(200).render("home", session);
    }

    async #getResetPassword(req, res) {
        res.status(200).render("resetPassword");
    }

    async #postResetPassword(req, res) {
        try {
            const { email, password } = req.body;
            await this.#userRouter.resetPasswordByEmail(email, password);
            res.status(200).render("login", { successMessage: "Se ha restaurado tu contraseña correctamente" });
        } catch (error) {
            res.status(500).render("resetPassword", { errorMessage: error.message });
        }
    }
}