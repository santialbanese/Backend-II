import moment from "moment";

export default class BombonDTO{
    fromModel(model){
        return{
            id: model.id,
            code: model.code,
            purchaseDateTime: moment(model.purchase_datetime).format("DD-MM-YYYY HH:mm:ss"),
            amount: model.amount,           
            purchaser: model.purchaser,
        }
    }

    fromData(data){
        return{
            id: data.id || null,
            code: data.code,
            purchaseDateTime: data.purchaseDateTime,
            amount: Number(data.amount),              
            purchaser: data.purchaser,
        }
    }
}