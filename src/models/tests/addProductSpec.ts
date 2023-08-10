import {orderedProductOperations} from '../addProducts';

const orderedProducts = new orderedProductOperations();


it('Add Product to an order', async () => {
    const result = await orderedProducts.addProductToOrder(1,1,15);
    expect(result).toEqual([{
        id: 1,
        product_id: '1',
        order_id: '1',
        quantity: '15'
    }]);
});
