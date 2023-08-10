import express, { Request, Response } from 'express';
import { order, orderOperations } from '../models/orders';
import dotenv from 'dotenv';
import jwt, { Secret } from 'jsonwebtoken';



dotenv.config();


const orders = new orderOperations();



const allOrders = async (req: Request, res: Response) => {
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

        const result = await orders.index().catch((err) => {
            res.status(506);
            throw err;
        });

        res.status(206);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}

const setOrder = async (req: Request, res: Response) => {

    const data: order = req.body.order

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

        const result = await orders.create(data).catch((err) => {
            res.status(507);
            throw err;
        });


        res.status(207);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}
const updateOrder = async (req: Request, res: Response) => {
    const data: order = {
        id: parseInt(req.params.id),
        user_id: req.body.order.user_id,
        status: req.body.order.status
    }
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
        const result = await orders.update(data).catch((err) => {
            res.status(508);
            throw err;
        });


        res.status(208);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}


const ordersHandler = (app: express.Application) => {
    app.get('/orders',allOrders);
    app.post('/orders', setOrder);
    app.put('/orders/:id', updateOrder);
}

export default ordersHandler;
