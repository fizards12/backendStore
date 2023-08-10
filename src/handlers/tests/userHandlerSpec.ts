import supertest from "supertest";
import app from "../../server";
import dotenv from 'dotenv';
import cryption from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

const server = supertest(app);

const pepper: string | undefined = process.env.BCRYPT_PASSWORD;
const saltRounds: string | undefined = process.env.SALT_ROUNDS;

interface User {
    first_name: String;
    last_name: String;
    password: String;
}

const user: User = {
    first_name: 'ahmed',
    last_name: 'mohamed',
    password: cryption.hashSync(
        ('123456' as string) + pepper,
        parseInt(saltRounds as string)
    )
}

export const token = jwt.sign({ user: user },//@ts-ignore 
process.env.TOKEN_SECRET);

describe('Check User API', () => {
    it('Sign up', async () => {
        const result = await server.post('/users').send({
            user: user
        })
        .set({Authorization: "Bearer " + token});
        expect(result.status).toBe(202)
    })

    it('show All users', async () => {
        const result = await server.get('/users').send({
            token: token
        })
        .set({Authorization: "Bearer " + token});

        expect(result.status).toBe(200);
    })

    it('Sign In', async () => {
        const result = await server.get('/users/1')
        .send({
            user: user
        })
        .set({
            Authorization: "Bearer " + token
        });
        expect(result.status).toBe(201);
    })
    afterAll((done) => {
        done();
    })

})