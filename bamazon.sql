DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(45) NULL,
    department_name VARCHAR(45) NULL,
    price DECIMAL(4,2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)  
);

INSERT INTO products (product, department, price, stock)
VALUES ("laptop","electronics", 500.00, 2),
    ("kleenex","bath&beauty", 1.50, 100),
    ("shoes","apparel", 108.00, 12),
    ("shampoo","bath&beauty", 8.00, 20),
    ("iphone","electronics", 200.00, 7),
    ("T-Shirt","apparel", 12.50, 10),
    ("Backpack","outdoors", 60.00, 6),
    ("Pens 5pk","office supplies", 7.50, 10),
    ("Tupperware","kitchen", 13.00, 6),
    ("Rubber chicken","misc", 4.50, 3);