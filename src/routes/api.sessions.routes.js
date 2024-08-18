import { Router } from "express";
import passport from "passport";
import UserManager from "../managers/UserManager.js";

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

router.post("/register", async (req, res, next) => { 
    passport.authenticate("register", (error, user, info) => { 
        if(error) return errorHandler(res, error.message);
        if(!user) return errorHandler(res, info.message);

        req.login(user, (errorLogin) => { 
            if(errorLogin) return errorHandler(res, errorLogin.message);
            res.status(200).json({ status: true })
        })
    })(req, res, next)
});

router.post("/login", async (req, res, next) => { 
    passport.authenticate("login", (error, user, info) => { 
        if(error) return errorHandler(res, error.message);
        if(!user) return errorHandler(res, info.message);

        req.login(user, (errorLogin) => { 
            if(errorLogin) return errorHandler(res, errorLogin.message);
            res.status(200).json({ status: true })
        })
    })(req, res, next) 
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

router.post("/logout", (req, res) => {
    req.logout((errorLogout) => {
        if (errorLogout) return next(errorLogout);
        res.status(200).json({ status: true });
    });
});

export default router;