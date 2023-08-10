import Client from "../database";

export type user = {
    id?: Number | String;
    first_name: String;
    last_name: String;
    password: String
}
export class userOperations {
    async create(b: user): Promise<user[]> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO users (first_name, last_name, password) VALUES ($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [b.first_name, b.last_name, b.password]);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot insert the user ${err}`);
        }
    }

    async index(): Promise<user[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot find the users ${err}`);
        }
    }

    async read(id: String | Number): Promise<user[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot find the user ${err}`);
        }
    }


    async delete(id: String | Number): Promise<user[]> {
        try {
            const conn = await Client.connect();
            const sql = 'DELETE FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot find the user ${err}`);
        }
    }
}