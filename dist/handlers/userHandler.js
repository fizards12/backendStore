"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;
const users = new users_1.userOperations();
const showAll = async (req, res) => {
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
        const allUsers = await users.index().catch((err) => {
            res.status(500);
            throw err;
        });
        res.status(200);
        res.json(allUsers);
    }
    catch (err) {
        res.json(err);
    }
};
const getUser = async (req, res) => {
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
        const result = await users.read(parseInt(req.params.id)).catch((err) => {
            res.status(501);
            throw err;
        });
        res.status(201);
        res.json(result);
    }
    catch (err) {
        res.json(err);
    }
};
const setUser = async (req, res) => {
    const hash = bcrypt_1.default.hashSync(req.body.user.password + pepper, parseInt(saltRounds));
    const data = {
        first_name: req.body.user.first_name,
        last_name: req.body.user.last_name,
        password: hash
    };
    try {
        const result = await users.create(data).catch((err) => {
            res.status(502);
            throw err;
        });
        const token = jsonwebtoken_1.default.sign({ user: result }, //@ts-ignore
        process.env.TOKEN_SECRET);
        res.status(202);
        res.json(token);
    }
    catch (err) {
        res.json(err);
    }
};
const usersHandler = (app) => {
    app.get('/users', showAll);
    app.get('/users/:id', getUser);
    app.post('/users', setUser);
};
exports.default = usersHandler;
