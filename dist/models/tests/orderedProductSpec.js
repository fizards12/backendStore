"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addProducts_1 = require("../addProducts");
const orderedProducts = new addProducts_1.orderedProductOperations();
it('Add Product to an order', async () => {
    const result = await orderedProducts.addProductToOrder(1, 1, 15);
    expect(result).toEqual([{
            id: 1,
            product_id: '1',
            order_id: '1',
            quantity: '15'
        }]);
});
