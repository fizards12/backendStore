"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderOperations = void 0;
const database_1 = __importDefault(require("../database"));
class orderOperations {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot find the orders ${err}`);
        }
    }
    async create(b) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *';
            const result = await conn.query(sql, [b.user_id, b.status]).catch((err) => {
                throw err;
            });
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot insert the order ${err}`);
        }
    }
    async read(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot find the order ${err}`);
        }
    }
    async update(b) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'UPDATE orders SET user_id=($2) ,status=($3) WHERE id=($1) RETURNING *';
            const result = await conn.query(sql, [b.id, b.user_id, b.status]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot change the order settings ${err}`);
        }
    }
    async delete(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'DELETE FROM orders WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot find the order ${err}`);
        }
    }
}
exports.orderOperations = orderOperations;
