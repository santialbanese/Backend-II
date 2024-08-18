import { Router } from "express";
import UserManager from "../managers/UserManager.js";
import {checkAuthHome} from "../middlewares/auth.middleware.js";

import {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND_ID,
    ERROR_NOT_FOUND_CREDENTIALS,
} from "../constants/messages.constant.js";

const errorHandler = (res, message) => {
    if (message === ERROR_INVALID_ID) return res.status(400).json({ status: false, message: ERROR_INVALID_ID });
    if (message === ERROR_NOT_FOUND_ID) return res.status(404).json({ status: false, message: ERROR_NOT_FOUND_ID });
    if (message === ERROR_NOT_FOUND_CREDENTIALS) return res.status(401).json({ status: false, message: ERROR_NOT_FOUND_CREDENTIALS });
    return res.status(500).json({ status: false, message });
};

const router = Router();
const userManager = new UserManager();

const validateSession = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(403).send("Este es un recurso privado exclusivo para usuarios registrados");
    }
    next();
};

router.get("/", validateSession, async (req, res) => { 
    try {
        const user = await userManager.getAll();
        res.status(200).json(user);
    } catch (error) {
        errorHandler(res, error.message);
    }
});

router.get("/:id", checkAuthHome, validateSession, async (req, res) => { 
    try {
        const id = req.params;
        const user = await userManager.getOneById(id);
        res.status(200).json(user);
    } catch (error) {
        errorHandler(res, error.message);
    }
});

router.post("/", async (req, res) => { 
    try {
        const data = req.body;
        const user = await userManager.insertOne(data);
        res.status(201).json(user);
    } catch (error) {
        errorHandler(res, error.message);
    }
});

router.put("/:id", checkAuthHome, validateSession, async (req, res) => { 
    try {
        const id = req.params;
        const data = req.body;
        const user = await userManager.updateOneById(id, data);
        res.status(200).json(user);
    } catch (error) {
        errorHandler(res, error.message);
    }
});

router.delete("/:id", checkAuthHome, validateSession, async (req, res) => { 
    try {
        const id = req.params;
        const user = await userManager.deleteOneById(id);
        res.status(200).json(user);
    } catch (error) {
        errorHandler(res, error.message);
    }
});

export default router;