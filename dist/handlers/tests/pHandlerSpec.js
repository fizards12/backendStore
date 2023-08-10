"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const userHandlerSpec_1 = require("./userHandlerSpec");
const server = (0, supertest_1.default)(server_1.default);
describe('Check Products End-Points', () => {
    it('Add another products to the menu', async () => {
        const result = await server.post('/products').send({
            product: {
                name: 'suger',
                price: 15
            }
        })
            .set({
            Authorization: "Bearer " + userHandlerSpec_1.token
        });
        expect(result.status).toBe(205);
    });
    it('Check the available Products', async () => {
        const result = await server.get('/products');
        expect(result.status).toBe(203);
    });
    it('Show the first product on the menu', async () => {
        const result = await server.get('/products/1');
        expect(result.status).toBe(204);
    });
    afterAll((done) => {
        done();
    });
});
