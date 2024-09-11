import TicketService from "../services/ticket.service.js";

export default class TicketController {
    #ticketService;

    constructor() {
        this.#ticketService = new TicketService();
    }

    async getAll(req, res) {
        try {
            const tickets = await this.#ticketService.findAll(req.query);
            res.sendSuccess200(tickets);
        } catch (error) {
            res.sendError(error);
        }
    }

    async getById(req, res) {
        try {
            const ticket = await this.#ticketService.findOneById(req.params.id);
            res.sendSuccess200(ticket);
        } catch (error) {
            res.sendError(error);
        }
    }

    async delete(req, res) {
        try {
            const ticket = await this.#ticketService.deleteOneById(req.params.id);
            res.sendSuccess200(ticket);
        } catch (error) {
            res.sendError(error);
        }
    }

    async addOneIngredient(req, res) {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const ticketUpdated = await this.#ticketService.addOneIngredient(cid, pid, quantity ?? 1);
            res.sendSuccess200(ticketUpdated);
        } catch (error) {
            res.sendError(error);
        }
    }

    async removeOneIngredient(req, res) {
        try {
            const { cid, pid } = req.params;
            const ticketDeleted = await this.#ticketService.removeOneIngredient(cid, pid, 1);
            res.sendSuccess200(ticketDeleted);
        } catch (error) {
            res.sendError(error);
        }
    }

    async removeAllIngredients(req, res) {
        try {
            const ticketDeleted = await this.#ticketService.removeAllIngredients(req.params.cid);
            res.sendSuccess200(ticketDeleted);
        } catch (error) {
            res.sendError(error);
        }
    }

}