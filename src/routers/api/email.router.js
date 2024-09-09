import BaseRouter from "../base.router.js";
import uploader from "../../utils/uploader.js";
import EmailController from "../../controllers/email.controller.js";

export default class EmailRouter extends BaseRouter {
    #emailController;

    constructor() {
        super();
        this.#emailController = new EmailController();
    }

    initialize() {
        const router = this.getRouter();

        this.addPostRoute("/send", [], uploader.single("file"), (req, res) => this.#emailController.send(req, res));

        router.use((err, req, res, next) => {
            res.sendError(err);
        });
    }
}