import { STATUS_CODES } from "../constants/messages.constant.js";

export const handleError = (error, req, res, next) => {
    const code = STATUS_CODES[error.message] ?? 500;

    const isAPI = req.originalUrl.startsWith("/api/");

    if (isAPI) {
        res.status(code).json({ status: false, message: error.message });
    } else {
        const view = res.view ?? "login";
        res.status(code).render(view, { errorMessage: error.message });
    }
};