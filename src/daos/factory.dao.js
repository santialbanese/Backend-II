import MongoDAO from "./mongo/mongo.dao.js";
import { MONGODB } from "../constants/dao.constant.js";
import Bombon from "./mongo/models/bombon.model.js";
import User from "./mongo/models/user.model.js";

export default class FactoryDAO {
    createBombon(className) {
        if (className === MONGODB) {
            return new MongoDAO(Bombon);
        }
    }
    createUser(className) {
        if (className === MONGODB) {
            return new MongoDAO(User);
        }
    }
}