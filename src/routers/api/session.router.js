import BaseRouter from "../base.router.js";
import { generateToken } from "../../middlewares/auth.middleware.js";
import { STANDARD } from "../../constants/roles.constant.js";

export default class SessionRouter extends BaseRouter {
    constructor() {
        super();
    }

    initialize() {
        const router = this.getRouter();
        this.addPostRoute("/login", [], generateToken, (req, res) => this.#login(req, res));
        this.addGetRoute("/current", [STANDARD], (req, res) => this.#getCurrentUser(req, res));

        router.use((err, req, res, next) => {
            res.sendError(err);
        });
    }

    // Maneja la solicitud POST para generar un token
    #login(req, res) {
        try {
            const token = req.token ?? req.cookies["token"] ?? null;
            res.sendSuccess201(token);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Maneja la solicitud GET para obtener el usuario autenticado
    #getCurrentUser(req, res) {
        try {
            const currentUser = {
                id: req.id,
                roles: req.roles,
                email: req.email,
            };

            res.sendSuccess200(currentUser);
        } catch (error) {
            res.sendError(error);
        }
    }
}