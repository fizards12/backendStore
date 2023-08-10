import express, { Request, Response } from 'express';
import {orderedProductOperations} from '../models/addProducts';
import jwt, { Secret } from 'jsonwebtoken';

const orderedProduct = new orderedProductOperations();

const insetProductToOrder = async (req: Request, res: Response) => {

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
        const result = await orderedProduct.addProductToOrder(
            req.body.productToAdd.productId,
            req.body.productToAdd.orderId,
            req.body.productToAdd.quantity).catch((err) => {
            res.status(509);
            throw err;
        });


        res.status(209);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}

const addProductRoute = (app: express.Application) => {
    app.post('/addProduct',insetProductToOrder);
}

export default addProductRoute;