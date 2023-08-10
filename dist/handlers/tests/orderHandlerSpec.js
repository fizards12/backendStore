"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const userHandlerSpec_1 = require("./userHandlerSpec");
const server = (0, supertest_1.default)(server_1.default);
describe('Orders API testing', () => {
    it('User adds an order', async () => {
        const result = await server.post('/orders').send({
            order: {
                user_id: 2,
                status: "Active"
            }
        })
            .set({
            Authorization: "Bearer " + userHandlerSpec_1.token
        });
        expect(result.status).toBe(207);
    });
    it('find all the orders', async () => {
        const result = await server.get('/orders').set({
            Authorization: "Bearer " + userHandlerSpec_1.token
        });
        expect(result.status).toBe(206);
    });
    it('An order is completed', async () => {
        const result = await server.put('/orders/1').send({
            order: {
                id: 1,
                user_id: "2",
                status: "complete"
            }
        })
            .set({
            Authorization: "Bearer " + userHandlerSpec_1.token
        });
        expect(result.status).toBe(208);
    });
    afterAll((done) => {
        done();
    });
});
