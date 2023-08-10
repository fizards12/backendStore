"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../orders");
const orders = new orders_1.orderOperations();
describe("orders", () => {
    describe("Check defined", () => {
        it('should have an index method', () => {
            expect(orders.index).toBeDefined();
        });
        it('should have a show method', () => {
            expect(orders.read).toBeDefined();
        });
        it('should have a create method', () => {
            expect(orders.create).toBeDefined();
        });
        it('should have a update method', () => {
            expect(orders.update).toBeDefined();
        });
        it('should have a delete method', () => {
            expect(orders.delete).toBeDefined();
        });
    });
    describe("Check worked correct", () => {
        it('create method should add an order', async () => {
            const result = await orders.create({
                user_id: "1",
                status: "Active"
            });
            expect(result).toEqual([{
                    id: 1,
                    user_id: "1",
                    status: "Active"
                }]);
        });
        it('index method should return a list of orders', async () => {
            const result = await orders.index();
            expect(result).toEqual([{
                    id: 1,
                    user_id: "1",
                    status: "Active"
                }]);
        });
        it('update method should update data of an order', async () => {
            const result = await orders.update({
                id: 1,
                user_id: 1,
                status: "complete"
            });
            expect(result).toEqual([{
                    id: 1,
                    user_id: "1",
                    status: "complete"
                }]);
        });
        it('show method should return the correct order', async () => {
            const result = await orders.read(1);
            expect(result).toEqual([{
                    id: 1,
                    user_id: "1",
                    status: "complete"
                }]);
        });
        xit('delete method should remove the order', async () => {
            await orders.delete(1);
            const result = await orders.index();
            expect(result).toEqual([]);
        });
    });
    afterAll((done) => {
        done();
    });
});
