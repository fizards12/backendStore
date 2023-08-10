import supertest from "supertest";
import app from "../../server";
import { token } from './userHandlerSpec';
const server = supertest(app);


describe('Check Products End-Points', () => {
    it('Add another products to the menu', async () => {
        const result = await server.post('/products').send({
            product: {
                name : 'suger',
                price : 15
            }
        })
        .set({
            Authorization: "Bearer " + token
        });
        expect(result.status).toBe(205)
    });

    it('Check the available Products', async () => {
        const result = await server.get('/products')
        expect(result.status).toBe(203)
    });


    it('Show the first product on the menu', async () => {
        const result = await server.get('/products/1')
        expect(result.status).toBe(204)
    });

    afterAll((done) => {
        done();
    });
})