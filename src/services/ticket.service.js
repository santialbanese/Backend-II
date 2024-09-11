import TicketRepository from "../repositories/ticket.repository.js";
import BombonService from "./bombon.service.js";
import CartService from "./cart.service.js";
import UserService from "./user.service.js";
import { ERROR_NOT_FOUND_INDEX } from "../constants/messages.constant.js";

export default class TicketService {
    #ticketRepository; 
    #bombonService;  
    #cartService;  
    #userService;  

    constructor() {
        this.#ticketRepository = new TicketRepository();
        this.#bombonService = new BombonService();
        this.#userService = new UserService();
    }

    async findAll(paramFilters) {
        const $and = [];

        if (paramFilters?.name) $and.push({ name: { $regex: paramFilters.name, $options: "i" } });
        const filters = $and.length > 0 ? { $and } : {};

        return await this.#ticketRepository.findAll(filters);
    }

    async findOneById(id) {
        return await this.#ticketRepository.findOneById(id);
    }

    async insertOne(userId, cart) {
        let total = 0;

        this.#userService.findOneById(data.userId);

        cart.bombon.forEach((item) => {
            this.#bombonService.validateStock(item.bombon, item.quantity);
        });
        cart.bombon.forEach((item) => {
            this.#bombonService.updateStockFromCart(item.bombon, item.quantity);

            const bombon = this.#bombonService.findOneById(item.bombon);
            total += bombon.price * item.quantity;
        });


        data.purchaser = userId;
        data.amount = total;
        return await this.#ticketRepository.save(data);
    }       

    async updateOneById(id, data) {
        const ticket = await this.#ticketRepository.findOneById(id);
        const newValues = { ...ticket, ...data };
        return await this.#ticketRepository.save(newValues);
    }

    async deleteOneById(id) {
        return await this.#ticketRepository.deleteOneById(id);
    }
}