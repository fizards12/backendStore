import Client from "../database";

export type product = {
    id? : Number | String;
    name?: String;
    price: Number;
}


export class productOperations {
    async index() : Promise<product[]> {
        try{
            const conn = await Client.connect();
            const sql =  'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows
        } catch(err){
            throw new Error(`Cannot find the products ${err}`);
        }
    }
    async create(b: product) : Promise<product[]> {
        try{
            const conn = await Client.connect();
            const sql =  'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *';
            const result = await conn.query(sql,[b.name, b.price]);
            conn.release();
            return result.rows;
        } catch(err){
            throw new Error(`Cannot insert the product ${err}`);
        }
    }

    async read(id: String | Number) : Promise<product[]> {
        try{
            const conn = await Client.connect();
            const sql =  'SELECT * FROM products WHERE id=($1)';
            const result = await conn.query(sql,[id]);
            conn.release();
            return result.rows;
        } catch(err){
            throw new Error(`Cannot find the product ${err}`);
        }
    }

    async update(b : product) : Promise<product[]> {
        try{
            const conn = await Client.connect();
            const sql =  'UPDATE products SET name=($2),price=($3) WHERE id=($1) RETURNING *';
            const result = await conn.query(sql,[b.id,b.name, b.price]);
            conn.release();
            return result.rows;
        } catch(err){
            throw new Error(`Cannot change the product settings ${err}`);
        }
    }

    async delete(id: String | Number) : Promise<product[]> {
        try{
            const conn = await Client.connect();
            const sql =  'DELETE FROM products WHERE id=($1)';
            const result = await conn.query(sql,[id]);
            conn.release();
            return result.rows;
        } catch(err){
            throw new Error(`Cannot find the product ${err}`);
        }
    }
}