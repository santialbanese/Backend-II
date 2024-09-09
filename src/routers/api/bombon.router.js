import BaseRouter from "../base.router.js";
import BombonController from "../../controllers/bombon.controller.js";
import { ADMIN, STANDARD } from "../../constants/roles.constant.js";
import uploader from "../../utils/uploader.js";

export default class IngredientRouter extends BaseRouter {
    #bombonController;

    constructor() {
        super();
        this.#bombonController = new BombonController();
    }

    initialize() {
        const router = this.getRouter();

        this.addGetRoute("/", [], (req, res) => this.#bombonController.getAll(req, res));
        this.addGetRoute("/:id", [STANDARD], (req, res) => this.#bombonController.getById(req, res));
        this.addPostRoute("/", [STANDARD], uploader.single("file"), (req, res) => this.#bombonController.create(req, res));
        this.addPutRoute("/:id", [STANDARD], uploader.single("file"), (req, res) => this.#bombonController.update(req, res));
        this.addDeleteRoute("/:id", [ADMIN], (req, res) => this.#bombonController.delete(req, res));

        router.use((err, req, res, next) => {
            res.sendError(err);
        });
    }
}