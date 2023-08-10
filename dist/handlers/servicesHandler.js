"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Services_1 = require("../services/Services");
dotenv_1.default.config();
const service = new Services_1.Services();
const getOrdersByUserId = async (req, res) => {
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
        const result = await service.getByUser(parseInt(req.params.id)).catch((err) => {
            res.status(510);
            throw err;
        });
        res.status(210);
        res.json(result);
    }
    catch (err) {
        res.json(err);
    }
};
const services = (app) => {
    app.get('/userorders/:id', getOrdersByUserId);
};
exports.default = services;
