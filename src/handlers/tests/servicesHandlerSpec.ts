import supertest from "supertest";
import app from "../../server";
import { token } from './userHandlerSpec';
const server = supertest(app);

describe('Test Services',()=>{
    it('find all the orders of a user', async () => {
        const result = await server.get('/userorders/1').set({
            Authorization: "Bearer " + token
        });
        expect(result.status).toBe(210);
    });
})