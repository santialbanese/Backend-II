import CartService from "../services/cart.service.js";

export default class CartController {
    #cartService;

    constructor() {
        this.#cartService = new CartService();
    }

    async getAll(req, res) {
        try {
            const carts = await this.#cartService.findAll(req.query);
            res.sendSuccess200(carts);
        } catch (error) {
            res.sendError(error);
        }
    }

    async getById(req, res) {
        try {
            const cart = await this.#cartService.findOneById(req.params.id);
            res.sendSuccess200(cart);
        } catch (error) {
            res.sendError(error);
        }
    }

    async create(req, res) {
        try {
            const cart = await this.#cartService.insertOne(req.body);
            res.sendSuccess201(cart);
        } catch (error) {
            res.sendError(error);
        }
    }

    async update(req, res) {
        try {
            const cart = await this.#cartService.updateOneById(req.params.id, req.body);
            res.sendSuccess200(cart);
        } catch (error) {
            res.sendError(error);
        }
    }

    async delete(req, res) {
        try {
            const cart = await this.#cartService.deleteOneById(req.params.id);
            res.sendSuccess200(cart);
        } catch (error) {
            res.sendError(error);
        }
    }

    async addOneIngredient(req, res) {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const cartUpdated = await this.#cartService.addOneIngredient(cid, pid, quantity ?? 1);
            res.sendSuccess200(cartUpdated);
        } catch (error) {
            res.sendError(error);
        }
    }

    async removeOneIngredient(req, res) {
        try {
            const { cid, pid } = req.params;
            const cartDeleted = await this.#cartService.removeOneIngredient(cid, pid, 1);
            res.sendSuccess200(cartDeleted);
        } catch (error) {
            res.sendError(error);
        }
    }

    async removeAllIngredients(req, res) {
        try {
            const cartDeleted = await this.#cartService.removeAllIngredients(req.params.cid);
            res.sendSuccess200(cartDeleted);
        } catch (error) {
            res.sendError(error);
        }
    }

}