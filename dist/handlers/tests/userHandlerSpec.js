"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.token = void 0;
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const server = (0, supertest_1.default)(server_1.default);
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;
const user = {
    first_name: 'ahmed',
    last_name: 'mohamed',
    password: bcrypt_1.default.hashSync('123456' + pepper, parseInt(saltRounds))
};
exports.token = jsonwebtoken_1.default.sign({ user: user }, //@ts-ignore 
process.env.TOKEN_SECRET);
describe('Check User API', () => {
    it('Sign up', async () => {
        const result = await server.post('/users').send({
            user: user
        })
            .set({ Authorization: "Bearer " + exports.token });
        expect(result.status).toBe(202);
    });
    it('show All users', async () => {
        const result = await server.get('/users').send({
            token: exports.token
        })
            .set({ Authorization: "Bearer " + exports.token });
        expect(result.status).toBe(200);
    });
    it('Sign In', async () => {
        const result = await server.get('/users/1')
            .send({
            user: user
        })
            .set({
            Authorization: "Bearer " + exports.token
        });
        expect(result.status).toBe(201);
    });
    afterAll((done) => {
        done();
    });
});
