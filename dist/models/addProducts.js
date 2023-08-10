"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderedProductOperations = void 0;
const database_1 = __importDefault(require("../database"));
class orderedProductOperations {
    async addProductToOrder(productId, orderId, quantity) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO prod_to_ord (product_id, order_id, quantity) VALUES ($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [productId, orderId, quantity]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot add the product to the order: ${err}`);
        }
    }
}
exports.orderedProductOperations = orderedProductOperations;
