import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import usersHandler from './handlers/userHandler';
import productsHandler from './handlers/productHandler';
import ordersHandler from './handlers/orderHandler';
import servicesHandler from './handlers/servicesHandler';
import addProductHandler from './handlers/addProductsHandler';
const app: express.Application = express();
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

usersHandler(app);

productsHandler(app);

ordersHandler(app);

servicesHandler(app);

addProductHandler(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})


export default app;