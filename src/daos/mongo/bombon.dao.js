import MongoDAO from "./mongo.dao.js";
import BombonModel from "./models/bombon.model.js";

export default class BombonDAO extends MongoDAO {
    constructor() {
        super(BombonModel);
    }
    
}