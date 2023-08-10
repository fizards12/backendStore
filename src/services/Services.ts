import Client from '../database'
import {order} from '../models/orders';



export class Services {
    // Get all products that have been included in orders
    async getByUser(id: String | Number) : Promise<order[]> {
        try{
            const conn = await Client.connect();
            const sql =  'SELECT * FROM orders WHERE user_id=($1)';
            const result = await conn.query(sql,[id]);
            conn.release();
            return result.rows;
        } catch(err){
            throw new Error(`Cannot find the order ${err}`);
        }
    }

    
}