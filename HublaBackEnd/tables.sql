CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    user_id VARCHAR(100) NOT NULL
);

CREATE TABLE vendors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    user_id VARCHAR(100) NOT NULL
);

CREATE TABLE type_transaction (
    id INTEGER PRIMARY KEY,
    description VARCHAR(100) NOT NULL,
    nature VARCHAR(10) NOT NULL,
    signal boolean NOT NULL
);

INSERT INTO type_transaction (id, description, nature, signal)
VALUES (1, 'Venda produtor', 'Entrada', TRUE),
       (2, 'Venda afiliado', 'Entrada', TRUE),
       (3, 'Comissão paga', 'Saída', FALSE),
       (4, 'Comissão recebida', 'Entrada', TRUE);

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    comission DECIMAL(10,2),
    seller_id INTEGER NOT NULL,
    user_id VARCHAR(100) NOT NULL,
    transaction_date TIMESTAMP NOT NULL,
    transaction_type INTEGER NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (seller_id) REFERENCES vendors(id),
    FOREIGN KEY (transaction_type) REFERENCES type_transaction(id)
);