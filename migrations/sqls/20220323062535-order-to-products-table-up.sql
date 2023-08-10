/* Replace with your SQL commands */
CREATE TABLE prod_to_ord (
    id SERIAL PRIMARY KEY,
    product_id BIGINT REFERENCES products(id),
    quantity BIGINT,
    order_id BIGINT REFERENCES orders(id)
);