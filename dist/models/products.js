"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productOperations = void 0;
const database_1 = __importDefault(require("../database"));
class productOperations {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot find the products ${err}`);
        }
    }
    async create(b) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *';
            const result = await conn.query(sql, [b.name, b.price]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot insert the product ${err}`);
        }
    }
    async read(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot find the product ${err}`);
        }
    }
    async update(b) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'UPDATE products SET name=($2),price=($3) WHERE id=($1) RETURNING *';
            const result = await conn.query(sql, [b.id, b.name, b.price]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot change the product settings ${err}`);
        }
    }
    async delete(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'DELETE FROM products WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot find the product ${err}`);
        }
    }
}
exports.productOperations = productOperations;
