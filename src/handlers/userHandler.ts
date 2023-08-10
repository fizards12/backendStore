import express, { Request, Response } from 'express';
import { user, userOperations } from '../models/users';
import cryption from 'bcrypt';
import dotenv from 'dotenv';
import jwt, { Secret } from 'jsonwebtoken';



dotenv.config();

const pepper: string | undefined = process.env.BCRYPT_PASSWORD;
const saltRounds: string | undefined = process.env.SALT_ROUNDS;


const users = new userOperations();


const showAll = async (req: Request, res: Response) => {
    try {
        const authorizationHeader : string | undefined= req.headers.authorization;
        const token = (authorizationHeader as string).split(' ')[1];
        jwt.verify(token,//@ts-ignore
        (process.env.TOKEN_SECRET), (err) => {
            if (err){
                res.status(400);
                throw err;
            }
        });
        const allUsers = await users.index().catch((err) => {
            res.status(500);
            throw err;
        });
        res.status(200);
        res.json(allUsers);
    } catch (err) {
        res.json(err);
    }

}


const getUser = async (req: Request, res: Response) => {
    try {
        const authorizationHeader : string | undefined= req.headers.authorization;
        const token = (authorizationHeader as string).split(' ')[1];
        jwt.verify(token,//@ts-ignore
        (process.env.TOKEN_SECRET), (err) => {
            if (err){
                res.status(400);
                throw err;
            }
        });
        const result = await users.read(parseInt(req.params.id)).catch((err) => {
            res.status(501);
            throw err;
        });
        res.status(201);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}

const setUser = async (req: Request, res: Response) => {


    const hash = cryption.hashSync(
        (req.body.user.password as string) + pepper,
        parseInt(saltRounds as string)
    );

    const data: user = {
        first_name: req.body.user.first_name,
        last_name: req.body.user.last_name,
        password: hash
    }

    try {
        const result = await users.create(data).catch((err) => {
            res.status(502);
            throw err;
        });

        const token = jwt.sign({ user: result },//@ts-ignore
        process.env.TOKEN_SECRET as Secret)

        res.status(202);
        res.json(token);
    } catch (err) {
        res.json(err);
    }

}


const usersHandler = (app: express.Application) => {
    app.get('/users', showAll);
    app.get('/users/:id', getUser);
    app.post('/users', setUser);
}

export default usersHandler;
