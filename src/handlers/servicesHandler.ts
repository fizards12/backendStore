import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt, { Secret } from 'jsonwebtoken';
import {Services} from '../services/Services';

dotenv.config();

const service = new Services();

const getOrdersByUserId = async (req: Request, res: Response) => {
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

        const result = await service.getByUser(parseInt(req.params.id)).catch((err) => {
            res.status(510);
            throw err;
        });

        res.status(210);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}


const services = (app: express.Application) => {
    app.get('/userorders/:id', getOrdersByUserId);
}

export default services;