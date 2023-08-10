"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const userHandlerSpec_1 = require("./userHandlerSpec");
const server = (0, supertest_1.default)(server_1.default);
it('Add product to an order', async () => {
    const result = await server.post('/addProduct').send({
        productToAdd: {
            order_id: 1,
            product_id: 1,
            quantity: 5
        }
    })
        .set({
        Authorization: "Bearer " + userHandlerSpec_1.token
    });
    expect(result.status).toBe(209);
});
