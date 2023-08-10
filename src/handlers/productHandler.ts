import express, { Request, Response } from 'express';
import { product, productOperations } from '../models/products';
import dotenv from 'dotenv';
import jwt, { Secret } from 'jsonwebtoken';



dotenv.config();

const pepper: string | undefined = process.env.BCRYPT_PASSWORD;
const saltRounds: string | undefined = process.env.SALT_ROUNDS;


const products = new productOperations();


const showAll = async (req: Request, res: Response) => {
    try {
        const allproducts = await products.index().catch((err) => {
            res.status(503);
            throw err;
        });

        res.status(203);
        res.json(allproducts);
    } catch (err) {
        res.json(err);
    }

}


const getProduct = async (req: Request, res: Response) => {
    try {
        const result = await products.read(parseInt(req.params.id)).catch((err) => {
            res.status(504);
            throw err;
        });

        res.status(204);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}

const setProduct = async (req: Request, res: Response) => {

    const data: product = {
        name: req.body.product.name,
        price: req.body.product.price
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

        const result = await products.create(data).catch((err) => {
            res.status(505);
            throw err;
        });

        res.status(205);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}


const productsHandler = (app: express.Application) => {
    app.get('/products', showAll);
    app.get('/products/:id', getProduct);
    app.post('/products', setProduct);
}

export default productsHandler;
