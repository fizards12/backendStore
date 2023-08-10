import Client from "../database";
export type order = {
    id? : String | Number;
    user_id : String | Number;
    status : String
}


export class orderOperations {
    async index() : Promise<order[]> {
        try{
            const conn = await Client.connect();
            const sql =  'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows
        } catch(err){
            throw new Error(`Cannot find the orders ${err}`);
        }
    }
    async create(b: order) : Promise<order[]> {
        try{
            const conn = await Client.connect();
            const sql =  'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *';
            const result = await conn.query(sql,[b.user_id,b.status]).catch((err)=>{
                throw err;
            });
            conn.release();
            return result.rows;
        } catch(err){
            throw new Error(`Cannot insert the order ${err}`);
        }
    }

    async read(id: String | Number) : Promise<order[]> {
        try{
            const conn = await Client.connect();
            const sql =  'SELECT * FROM orders WHERE id=($1)';
            const result = await conn.query(sql,[id]);
            conn.release();
            return result.rows;
        } catch(err){
            throw new Error(`Cannot find the order ${err}`);
        }
    }

    

    async update(b : order) : Promise<order[]> {
        try{
            const conn = await Client.connect();
            const sql =  'UPDATE orders SET user_id=($2) ,status=($3) WHERE id=($1) RETURNING *';
            const result = await conn.query(sql,[b.id, b.user_id, b.status]);
            conn.release();
            return result.rows;
        } catch(err){
            throw new Error(`Cannot change the order settings ${err}`);
        }
    }

    async delete(id: String | Number) : Promise<order[]> {
        try{
            const conn = await Client.connect();
            const sql =  'DELETE FROM orders WHERE id=($1)';
            const result = await conn.query(sql,[id]);
            conn.release();
            return result.rows;
        } catch(err){
            throw new Error(`Cannot find the order ${err}`);
        }
    }
}