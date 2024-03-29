"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const userHandlerSpec_1 = require("./userHandlerSpec");
const server = (0, supertest_1.default)(server_1.default);
describe('Test Services', () => {
    it('find all the orders of a user', async () => {
        const result = await server.get('/userorders/1').set({
            Authorization: "Bearer " + userHandlerSpec_1.token
        });
        expect(result.status).toBe(210);
    });
});
