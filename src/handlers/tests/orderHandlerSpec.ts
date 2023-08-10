import supertest from "supertest";
import app from "../../server";
import { token } from './userHandlerSpec';
const server = supertest(app);

describe('Orders API testing', () => {

    it('User adds an order', async () => {
        const result = await server.post('/orders').send({
            order: {
                user_id: 2,
                status: "Active"
            }
        })
        .set({
            Authorization: "Bearer " + token
        });
        expect(result.status).toBe(207);
    });

    it('find all the orders', async () => {
        const result = await server.get('/orders').set({
            Authorization: "Bearer " + token
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
            Authorization: "Bearer " + token
        });
        expect(result.status).toBe(208);
    });
    
    afterAll((done) => {
        done();
    });
})