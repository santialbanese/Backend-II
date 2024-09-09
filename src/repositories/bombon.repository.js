import FactoryDAO from "../daos/factory.dao.js";
import BombonDTO from "../dtos/bombon.dto.js";
import { MONGODB } from "../constants/dao.constant.js";
import { ERROR_NOT_FOUND_ID } from "../constants/messages.constant.js";

export default class BombonRepository {
    #bombonDAO;
    #bombonDTO; 

    constructor() {
        const factory = new FactoryDAO();
        this.#bombonDAO = factory.createBombon(MONGODB);
        this.#bombonDTO = new BombonDTO();
    }

    async findAll(params) {
        const $and = [];

        if (params?.title) $and.push({ title: { $regex: params.title, $options: "i" } });
        const filters = $and.length > 0 ? { $and } : {};

        const bombons = await this.#bombonDAO.findAll(filters, params);
        const bombonsDTO = bombons?.docs?.map((bombon) => this.#bombonDTO.fromModel(bombon));
        bombons.docs = bombonsDTO;

        return bombons;
    }

    
    async findOneById(id) {
        const bombon = await this.#bombonDAO.findOneById(id);
        if (!bombon) throw new Error(ERROR_NOT_FOUND_ID);

        return this.#bombonDTO.fromModel(bombon);
    }

    async save(data) {
        const bombonDTO = this.#bombonDTO.fromData(data);
        const bombon = await this.#bombonDAO.save(bombonDTO);
        return this.#bombonDTO.fromModel(bombon);
    }

    async deleteOneById(id) {
        const bombon = await this.findOneById(id);
        await this.#bombonDAO.deleteOneById(id);
        return bombon;
    }
}