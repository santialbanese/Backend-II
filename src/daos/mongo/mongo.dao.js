export default class MongoDAO {
    #model;

    constructor(model) {
        this.#model = model;
    }
 
    // Obtener todos los documentos con filtros opcionales
    async findAll(filters, params) {
        const sort = {
            asc: { title: 1 },
            desc: { title: -1 },
        };

        const paginationOptions = {
            limit: params?.limit ?? 10,
            page: params?.page ?? 1,
            sort: sort[params?.sort] ?? {},
            populate: params?.populate ?? "",
            lean: true,
        };

        // Busca y pagina todos los productos
        return await this.#model.paginate(filters, paginationOptions);
    }

    // Buscar un documento por su ID
    async findOneById(id) {
        return await this.#model.findOne({ _id: id });
    }

    // Buscar un documento por un criterio
    async findOneByCriteria(criteria) {
        return await this.#model.findOne(criteria);
    }

    // Guarda los datos de un documento
    async save(data) {
        if (data.id) {
            return await this.#model.findByIdAndUpdate(data.id, data, { runValidators: true });
        } else {
            const object = new this.#model(data);
            return await object.save();
        }
    }

    // Eliminar un documento por su ID
    async deleteOneById(id) {
        return await this.#model.deleteOne({ _id: id });
    }
}