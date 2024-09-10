export default class CartDTO {
    fromModel(model) {
        return {
            id: model.id,
            bombons: model.bombons,
        };
    }

    fromData(data) {
        return {
            id: data.id || null,
            bombons: data.bombons,
        };
    }
}