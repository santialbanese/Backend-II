import BaseRouter from "../base.router.js";
import CartController from "../../controllers/cart.controller.js";
import { ADMIN, STANDARD, PREMIUM } from "../../constants/roles.constant.js";

export default class CartRouter extends BaseRouter {
    #cartController;

    constructor() {
        super();
        this.#cartController = new CartController();
    }

    initialize() {
        const router = this.getRouter();

        this.addGetRoute("/", [STANDARD, ADMIN], (req, res) => this.#cartController.getAll(req, res));
        this.addGetRoute("/:id", [STANDARD, ADMIN], (req, res) => this.#cartController.getById(req, res));
        this.addPostRoute("/", [ PREMIUM, ADMIN ], (req, res) => this.#cartController.create(req, res));
        this.addPutRoute("/:id", [PREMIUM, ADMIN], (req, res) => this.#cartController.update(req, res));
        this.addDeleteRoute("/:id", [ADMIN], (req, res) => this.#cartController.delete(req, res));
        this.addPutRoute("/:cid/bombons/:pid", [STANDARD, ADMIN], (req, res) => this.#cartController.addOneIngredient(req, res));
        this.addDeleteRoute("/:cid/bombons/:pid", [STANDARD, ADMIN], (req, res) => this.#cartController.removeOneIngredient(req, res));
        this.addDeleteRoute("/:cid/bombons", [STANDARD, ADMIN], (req, res) => this.#cartController.removeAllIngredients(req, res));

        router.use((err, req, res, next) => {
            res.sendError(err);
        });
    }
}