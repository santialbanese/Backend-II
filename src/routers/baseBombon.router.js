import { Router } from "express";
import { ERROR_INVALID_ID, STATUS_CODES } from "../constants/messages.constant.js";

export default class BaseBombonRouter {
    #router;
    #statusCodes;

    constructor() {
        this.#router = Router();
        this.#statusCodes = STATUS_CODES;
        this.#defineCustomResponses();
        this.#addIdValidation();
        this.initialize();
    }

    // Método protegido: Inicializa la configuración del Router
    initialize() {
        throw new Error("Este método debe ser sobrescrito en una clase hija");
    }

    // Método privado: Define respuestas personalizadas para las rutas
    #defineCustomResponses() {
        this.#router.use((req, res, next) => {
            res.sendSuccess200 = (payload) => res.status(200).json({ status: true, payload });
            res.sendSuccess201 = (payload) => res.status(201).json({ status: true, payload });
            res.sendError = (error) => this.#defineErrorResponse(error.message, res);
            next();
        });
    }
    

    // Método privado: Configura la respuesta de error basada en el mensaje de error
    #defineErrorResponse(errorMessage, res) {
        const statusCode = this.#statusCodes[errorMessage] || 500;
        res.status(statusCode).json({ status: false, message: errorMessage });
    }

    // Método privado: Agrega una validación en el parámetro de ruta "id", "iid" o "rid"
    #addIdValidation() {
        const pattern = /^[0-9a-fA-F]{24}$/;
        this.#router.param("id", this.#validatePathParam(pattern, ERROR_INVALID_ID));
    }

    // Método privado: Valida un parámetro de ruta según el patrón dado
    #validatePathParam(pattern, errorMessage) {
        return (req, res, next, paramValue) => {
            if (!pattern.test(paramValue)) {
                return next(new Error(errorMessage));
            }
            next();
        };
    }

    // Método privado: Agrega una ruta con políticas y callbacks especificados
    #addRoute(method, path, ...callbacks) {
        // Registra la ruta en el enrutador con el método HTTP recibido
        this.#router[method](path, ...callbacks);
    }

    // Método público: Define una ruta GET
    addGetRoute(path, ...callbacks) {
        this.#addRoute("get", path, policies, ...callbacks);
    }

    // Método público: Define una ruta POST
    addPostRoute(path, ...callbacks) {
        this.#addRoute("post", path, policies, ...callbacks);
    }

    // Método público: Define una ruta PUT
    addPutRoute(path, ...callbacks) {
        this.#addRoute("put", path, policies, ...callbacks);
    }

    // Método público: Define una ruta DELETE
    addDeleteRoute(path, ...callbacks) {
        this.#addRoute("delete", path, policies, ...callbacks);
    }

    // Método público: Retorna el router configurado
    getRouter() {
        return this.#router;
    }
}