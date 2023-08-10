"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../products");
const products = new products_1.productOperations();
describe("products", () => {
    describe("Check defined", () => {
        it('should have an index method', () => {
            expect(products.index).toBeDefined();
        });
        it('should have a show method', () => {
            expect(products.read).toBeDefined();
        });
        it('should have a create method', () => {
            expect(products.create).toBeDefined();
        });
        it('should have a update method', () => {
            expect(products.update).toBeDefined();
        });
        it('should have a delete method', () => {
            expect(products.delete).toBeDefined();
        });
    });
    describe("Check worked correct", () => {
        it('create method should add a product', async () => {
            const result = await products.create({
                name: 'Corwason',
                price: 15,
                id: undefined
            });
            expect(result).toEqual([{
                    id: 1,
                    name: 'Corwason',
                    price: 15
                }]);
        });
        it('index method should return a list of products', async () => {
            const result = await products.index();
            expect(result).toEqual([{
                    id: 1,
                    name: 'Corwason',
                    price: 15
                }]);
        });
        it('update method should update a product\'s data', async () => {
            const result = await products.update({
                id: 1,
                name: 'Corwason',
                price: 20
            });
            expect(result).toEqual([{
                    id: 1,
                    name: 'Corwason',
                    price: 20
                }]);
        });
        it('show method should return the correct product', async () => {
            const result = await products.read(1);
            expect(result).toEqual([{
                    id: 1,
                    name: 'Corwason',
                    price: 20
                }]);
        });
        xit('delete method should remove the product', async () => {
            products.delete(1);
            const result = await products.index();
            expect(result).toEqual([]);
        });
    });
    afterAll((done) => {
        done();
    });
});
