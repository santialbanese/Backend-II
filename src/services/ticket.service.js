import TicketRepository from "../repositories/ticket.repository.js";
import { ERROR_NOT_FOUND_INDEX } from "../constants/messages.constant.js";

export default class TicketService {
    #ticketRepository; 

    constructor() {
        this.#ticketRepository = new TicketRepository();
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

    async insertOne(data) {
        
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