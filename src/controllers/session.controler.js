export default class SessionController {

    login(req, res, next) {
        try {
            const token = req.token ?? null;
            return res.status(200).json({ token });
        } catch (error) {
            next(error);
        }
    }
}