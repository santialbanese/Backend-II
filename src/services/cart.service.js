import CartRepository from "../repositories/cart.repository.js";
import TicketService from "./ticket.service.js";
import { ERROR_NOT_FOUND_INDEX } from "../constants/messages.constant.js";

export default class CartService {
    #cartRepository; 
    #ticketService; 

    constructor() {
        this.#cartRepository = new CartRepository();
        this.#ticketService = new TicketService();
    }

    async findAll(paramFilters) {
        const $and = [];

        if (paramFilters?.name) $and.push({ name: { $regex: paramFilters.name, $options: "i" } });
        const filters = $and.length > 0 ? { $and } : {};

        return await this.#cartRepository.findAll(filters);
    }

    async findOneById(id) {
        return await this.#cartRepository.findOneById(id);
    }

    async insertOne(data) {
        return await this.#cartRepository.save(data);
    }

    async updateOneById(id, data) {
        const cart = await this.#cartRepository.findOneById(id);
        const newValues = { ...cart, ...data };
        return await this.#cartRepository.save(newValues);
    }

    async deleteOneById(id) {
        return await this.#cartRepository.deleteOneById(id);
    }

    async addOneIngredient(id, bombonId, quantity = 0) {
        const cart = await this.#cartRepository.findOneById(id);

        const bombonIndex = cart.bombons.findIndex((item) => item.bombon.toString() === bombonId);

        if (bombonIndex >= 0) {
            cart.bombons[bombonIndex].quantity += quantity;
        } else {
            cart.bombons.push({ bombon: bombonId, quantity });
        }

        return await this.#cartRepository.save(cart);
    }

    async removeOneIngredient(id, bombonId, quantity = 0) {
        const cart = await this.#cartRepository.findOneById(id);

        const bombonIndex = cart.bombons.findIndex((item) => item.bombon.toString() === bombonId);
        if (bombonIndex < 0) {
            throw new Error(ERROR_NOT_FOUND_INDEX);
        }

        if (cart.bombons[bombonIndex].quantity > quantity) {
            cart.bombons[bombonIndex].quantity -= quantity;
        } else {
            cart.bombons.splice(bombonIndex, 1);
        }

        return await this.#cartRepository.save(cart);
    }
 
    async removeAllIngredients(id) {
        const cart = await this.#cartRepository.findOneById(id);
        cart.bombons = [];

        return await this.#cartRepository.save(cart);
    }

    async createTicketFromCart(id, userId) {
        const cartFound = await this.findOneById(id);

        return await this.#ticketService.insertOne(userId, cartFound);
    }
}