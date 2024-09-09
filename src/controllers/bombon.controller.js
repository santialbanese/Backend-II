import BombonService from "../services/bombon.service.js";
import { deleteFile } from "../utils/fileSystem.js";
import paths from "../utils/paths.js";

export default class BombonController {
    #bombonService;

    constructor() {
        this.#bombonService = new BombonService();
    }

    async getAll(req, res) {
        try {
            const bombons = await this.#bombonService.findAll(req.query);
            res.sendSuccess200(bombons);
        } catch (error) {
            res.sendError(error);
        }
    }

    async getById(req, res) {
        try {
            const bombon = await this.#bombonService.findOneById(req.params.id);
            res.sendSuccess200(bombon);
        } catch (error) {
            res.sendError(error);
        }
    }

    async create(req, res) {
        try {
            const bombon = await this.#bombonService.insertOne(req.body, req.file?.filename);
            res.sendSuccess201(bombon);
        } catch (error) {
            if (req.file?.filename) await deleteFile(paths.images, req.file.filename);
            res.sendError(error);
        }
    }

    async update(req, res) {
        try {
            const bombon = await this.#bombonService.updateOneById(req.params.id, req.body, req.file?.filename);
            res.sendSuccess200(bombon);
        } catch (error) {
            if (req.file?.filename) await deleteFile(paths.images, req.file.filename);
            res.sendError(error);
        }
    }

    async delete(req, res) {
        try {
            const bombon = await this.#bombonService.deleteOneById(req.params.id);
            res.sendSuccess200(bombon);
        } catch (error) {
            res.sendError(error);
        }
    }
}