import TicketRepository from "../repositories/ticket.repository.js";
import { deleteFile } from "../utils/fileSystem.js";
import paths from "../utils/paths.js";

export default class TicketService {
    #ticketRepository;

    constructor() {
        this.#ticketRepository = new TicketRepository();
    }

    async findAll(params) {
        return await this.#ticketRepository.findAll(params);
    }

    async findOneById(id) {
        return await this.#ticketRepository.findOneById(id);
    }

    async insertOne(data, filename) {
        return await this.#ticketRepository.save({
            ...data,
            thumbnail: filename ?? null,
        });
    }

    async updateOneById(id, data, filename) {
        const currentTicket = await this.#ticketRepository.findOneById(id);
        const currentThumbnail = currentTicket.thumbnail;
        const newThumbnail = filename;

        const ticket = await this.#ticketRepository.save({
            ...currentTicket,
            ...data,
            thumbnail: newThumbnail ?? currentThumbnail,
        });

        if (filename && newThumbnail !== currentThumbnail) {
            await deleteFile(paths.images, currentThumbnail);
        }

        return ticket;
    }

    async deleteOneById(id) {
        return await this.#ticketRepository.deleteOneById(id);
    }
}