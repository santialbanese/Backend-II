import BombonRepository from "../repositories/bombon.repository.js";
import { deleteFile } from "../utils/fileSystem.js";
import paths from "../utils/paths.js";

export default class BombonService {
    #bombonRepository;

    constructor() {
        this.#bombonRepository = new BombonRepository();
    }

    async findAll(params) {
        return await this.#bombonRepository.findAll(params);
    }

    async findOneById(id) {
        return await this.#bombonRepository.findOneById(id);
    }

    async insertOne(data, filename) {
        return await this.#bombonRepository.save({
            ...data,
            thumbnail: filename ?? null,
        });
    }

    async updateOneById(id, data, filename) {
        const currentBombon = await this.#bombonRepository.findOneById(id);
        const currentThumbnail = currentBombon.thumbnail;
        const newThumbnail = filename;

        const bombon = await this.#bombonRepository.save({
            ...currentBombon,
            ...data,
            thumbnail: newThumbnail ?? currentThumbnail,
        });

        if (filename && newThumbnail !== currentThumbnail) {
            await deleteFile(paths.images, currentThumbnail);
        }

        return bombon;
    }

    async deleteOneById(id) {
        return await this.#bombonRepository.deleteOneById(id);
    }
}