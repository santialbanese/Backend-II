import MongoDAO from "./mongo/mongo.dao.js";
import { MONGODB } from "../constants/dao.constant.js";
import Bombon from "./mongo/models/bombon.model.js";
import User from "./mongo/models/user.model.js";
import Cart from "./mongo/models/cart.model.js";
import Ticket from "./mongo/models/ticket.model.js";

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
    createCart(className) {
        if (className === MONGODB) {
            return new MongoDAO(Cart);
        }
    }
    createTicket(className) {
        if (className === MONGODB) {
            return new MongoDAO(Ticket);
        }
    }
}