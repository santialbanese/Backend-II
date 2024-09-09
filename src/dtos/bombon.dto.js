import { convertToBoolean } from "../utils/converter.js";

export default class BombonDTO{
    fromModel(model){
        return{
            id: model.id,
            name: model.name,
            gut: model.gut,
            description: model.description,
            price: model.price,           
            stock: model.stock,
            status: model.status,
            thumbnail: model.thumbnail,
        }
    }

    fromData(data){
        return{
            id: data.id || null,
            name: data.name,
            gut: data.gut,
            description: data.description,
            price: Number(data.price),           
            stock: Number(data.stock),   
            status: convertToBoolean(data.status),
            thumbnail: data.thumbnail,
        }
    }
}