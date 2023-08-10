"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const addProducts_1 = require("../models/addProducts");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const orderedProduct = new addProducts_1.orderedProductOperations();
const insetProductToOrder = async (req, res) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, //@ts-ignore
        (process.env.TOKEN_SECRET), (err) => {
            if (err) {
                res.status(400);
                throw err;
            }
        });
        const result = await orderedProduct.addProductToOrder(req.body.productToAdd.productId, req.body.productToAdd.orderId, req.body.productToAdd.quantity).catch((err) => {
            res.status(509);
            throw err;
        });
        res.status(209);
        res.json(result);
    }
    catch (err) {
        res.json(err);
    }
};
const addProductRoute = (app) => {
    app.post('/addProduct', insetProductToOrder);
};
exports.default = addProductRoute;
