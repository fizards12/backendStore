import Client from "../database";

export type orderedProduct = {
    id? : String | Number;
    product_id : String | Number;
    order_id : String | Number;
    quantity : String | Number
}


export class orderedProductOperations {
    async addProductToOrder(productId : Number, orderId : Number, quantity: Number) : Promise<orderedProduct[]> {
        try{
            const conn = await Client.connect();
            const sql =  'INSERT INTO prod_to_ord (product_id, order_id, quantity) VALUES ($1, $2, $3) RETURNING *';
            const result = await conn.query(sql,[productId, orderId, quantity]);
            conn.release();
            return result.rows;
        } catch(err){
            throw new Error(`Cannot add the product to the order: ${err}`);
        }
    }
}