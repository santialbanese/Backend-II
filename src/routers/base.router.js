import { Router } from "express";
import { ERROR_INVALID_ID, STATUS_CODES } from "../constants/messages.constant"


export default class BaseRouter{ 
    #router;
    #statusCodes;

    constructor(){
        this.#router = Router();
        this.#statusCodes = STATUS_CODES;
        this.#defineCustomResponses();
        this.#addIdValidation();
        this.initialize();
    }

    initialize(){
        throw new Error("este metodo debe ser sobrescrito en las clases hijas")
    }
    //manejo de errores
    #defineCustomResponses() {
        this.#router.use((req, res, next) => {
            res.sendSuccess200 = (payload) => res.status(200).json({ status: true, payload });
            res.sendSuccess201 = (payload) => res.status(201).json({ status: true, payload });
            res.sendError = (error) => this.#defineErrorResponse(error.message, res);
            next();
        });
    }
    #addIdValidation(){
        const pattern = /^[0-9a-fA-F]{24}$/;

        this.#router.param("id", this.#validatePathParam(pattern, ERROR_INVALID_ID));
        this.#router.param("rid", this.#validatePathParam(pattern, ERROR_INVALID_ID));
        this.#router.param("iid", this.#validatePathParam(pattern, ERROR_INVALID_ID));
    }
    
    #validatePathParam(pattern, errorMessage) {
        return (req, res, next, paramValue) => {
            if (!pattern.test(paramValue)) {
                return next(new Error(errorMessage));
            }
            next();
        };
    }

    #defineErrorResponse(errorMessage, res) {
        const statusCode = this.#statusCodes[errorMessage] || 500;
        res.status(statusCode).json({ status: false, message: errorMessage });
    }

    #addRoute(method, path, ...callbacks) {
        this.#router[method](path, ...callbacks);
    }

    addGetRoute(path, ...callbacks) {
        this.#addRoute("get", path, ...callbacks);
    }

    addPostRoute(path, ...callbacks) {
        this.#addRoute("post", path, ...callbacks);
    }

    addPutRoute(path, ...callbacks) {
        this.#addRoute("put", path, ...callbacks);
    }

    addDeleteRoute(path, ...callbacks) {
        this.#addRoute("delete", path, ...callbacks);
    }

    getRouter(){
        return this.#router;
    }
}