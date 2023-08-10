import supertest from "supertest";
import app from "../../server";
import { token } from './userHandlerSpec';

const server = supertest(app);

it('Add product to an order', async () => {
    const result = await server.post('/addProduct').send({
        productToAdd: {
            order_id: 1,
            product_id: 1,
            quantity: 5
        }
    })
    .set({
        Authorization: "Bearer " + token
    });
    expect(result.status).toBe(209);
});