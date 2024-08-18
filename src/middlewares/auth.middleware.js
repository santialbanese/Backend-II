import passport from "passport";
import jwt from "jsonwebtoken";
import UserManager from "../managers/UserManager.js";  
import { ERROR_NOT_FOUND_TOKEN, ERROR_INVALID_TOKEN, ERROR_INVALID_ID, ERROR_NOT_FOUND_ID, ERROR_NOT_HAVE_PRIVILEGES } from "../constants/messages.constant.js";

const translator = {
    ["No auth token"]: `<h1>Recurso Protegido</h1><h3 style='color: red;'>${ERROR_NOT_FOUND_TOKEN}</h3>`,
    ["invalid token"]: `<h1>Recurso Protegido</h1><h3 style='color: red;'>${ERROR_INVALID_TOKEN}</h3>`,
    [ERROR_INVALID_ID]: `<h1>Recurso Protegido</h1><h3 style='color: red;'>${ERROR_INVALID_ID}</h3>`,
    [ERROR_NOT_FOUND_ID]: `<h1>Recurso Protegido</h1><h3 style='color: red;'>${ERROR_NOT_FOUND_ID}</h3>`,
};

const userManager = new UserManager();

export const generateToken = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userFound = await userManager.getOneByEmailAndPassword(email, password);
        if (!userFound) {
            return res.status(401).json({ status: false, message: "Invalid email or password" });
        }
        const token = jwt.sign({ id: userFound._id, email }, process.env.SECRET_KEY, { expiresIn: "2h" });
        req.token = token;

        next();
    } catch (error) {
        next(error);  
    }
};

export const checkLogin = (req, res, next) => {
    const token = req.cookies["cookieToken"];
    if (!token) {
        req.isAuthenticated = () => false;
        return next();
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            req.isAuthenticated = () => false;
            return next();
        }
        req.user = user;
        req.isAuthenticated = () => true;
        next();
    });
};

export const checkAuthHome = (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (error, user, info) => {
        if (error) return next(error);
        if (!user) {
            //const message = translator[info.message] ?? info.message;
            return res.status(401).render("error");
        }
        req.role = user.role;
        next();
    })(req, res, next);
};


export const checkAdminRole = (req, res, next) => {
    if (req.role != "admin") {
        return res.status(403).render("error");
    }

    return next();
};