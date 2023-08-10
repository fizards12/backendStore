"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../models/orders");
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const orders = new orders_1.orderOperations();
const allOrders = async (req, res) => {
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
        const result = await orders.index().catch((err) => {
            res.status(506);
            throw err;
        });
        res.status(206);
        res.json(result);
    }
    catch (err) {
        res.json(err);
    }
};
const setOrder = async (req, res) => {
    const data = req.body.order;
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
        const result = await orders.create(data).catch((err) => {
            res.status(507);
            throw err;
        });
        res.status(207);
        res.json(result);
    }
    catch (err) {
        res.json(err);
    }
};
const updateOrder = async (req, res) => {
    const data = {
        id: parseInt(req.params.id),
        user_id: req.body.order.user_id,
        status: req.body.order.status
    };
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
        const result = await orders.update(data).catch((err) => {
            res.status(508);
            throw err;
        });
        res.status(208);
        res.json(result);
    }
    catch (err) {
        res.json(err);
    }
};
const ordersHandler = (app) => {
    app.get('/orders', allOrders);
    app.post('/orders', setOrder);
    app.put('/orders/:id', updateOrder);
};
exports.default = ordersHandler;
