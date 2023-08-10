"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../models/products");
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;
const products = new products_1.productOperations();
const showAll = async (req, res) => {
    try {
        const allproducts = await products.index().catch((err) => {
            res.status(503);
            throw err;
        });
        res.status(203);
        res.json(allproducts);
    }
    catch (err) {
        res.json(err);
    }
};
const getProduct = async (req, res) => {
    try {
        const result = await products.read(parseInt(req.params.id)).catch((err) => {
            res.status(504);
            throw err;
        });
        res.status(204);
        res.json(result);
    }
    catch (err) {
        res.json(err);
    }
};
const setProduct = async (req, res) => {
    const data = {
        name: req.body.product.name,
        price: req.body.product.price
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
        const result = await products.create(data).catch((err) => {
            res.status(505);
            throw err;
        });
        res.status(205);
        res.json(result);
    }
    catch (err) {
        res.json(err);
    }
};
const productsHandler = (app) => {
    app.get('/products', showAll);
    app.get('/products/:id', getProduct);
    app.post('/products', setProduct);
};
exports.default = productsHandler;
