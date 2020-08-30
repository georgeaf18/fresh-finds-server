const mysql = require("mysql");
const Joi = require("joi");
const connection = mysql.createConnection({
	host: "localhost",
	user: "guest1",
	password: "guestpass",
	database: "fresh_finds"
});

const products = {
	getAllProducts: () => {
		let sql = `SELECT * FROM products`;
		return new Promise((resolve, reject) => {
			const products = [];

			connection.query(sql, function(err, rows) {
				if (err) throw err;

				rows.forEach(row => {
					products.push(populateProduct(row));
					// console.log('Result => ', products)
				});

				resolve(products);
			});
		});
	},

	getProduct: id => {
		let sql = `SELECT * FROM products where product_id = ${connection.escape(
			id
		)}`;
		return new Promise((resolve, reject) => {
			const products = [];

			connection.query(sql, function(err, rows) {
				if (err) throw err;

				rows.forEach(row => {
					products.push(populateProduct(row));
					// console.log('Result => ', products)
				});

				resolve(products);
			});
		});
	},

	insertProduct: product => {
		let sql = `INSERT INTO products 
        (SKU, product_name, created_at, in_stock, description, discount, featured, category, quantity_in_stock, discount_available, price, sold_by) 
        VALUES ('${product.SKU}', '${product.product_name}', '${product.created_at}', ${product.in_stock}, 
            '${product.description}', ${product.discount}, ${product.featured}, '${product.category}', ${product.quantity_in_stock}, ${product.discount_available}, 
            ${product.price}, '${product.sold_by}' );`;

		// console.log("SQL -> " + sql);

		return new Promise((resolve, reject) => {
			connection.query(sql, (err, result) => {
				if (!err) {
					resolve({ status: "success" });
				} else {
					resolve({ status: "error", err: err });
				}
			});
		});
	},

	updateProduct: (id, product) => {
		let sql = `UPDATE products 
		SET product_name = '${product.product_name}',
		 price = ${product.price},
		 SKU = ${product.SKU},
		 in_stock = ${product.in_stock},
		 picture = '${product.picture}',
		 description = '${product.description}',
		 discount = ${product.discount},
		 featured = ${product.featured},
		 category = '${product.category}',
		 quantity_in_stock = ${product.quantity_in_stock},
		 discount_available = ${product.discount_available} 
		 WHERE product_id = ${iconnection.escape(id)};

		 `;

		console.log(sql);

		return new Promise((resolve, reject) => {
			connection.query(sql, (err, result) => {
				if (!err) {
					resolve({ status: "success" });
				} else {
					resolve({ status: "error", err: err });
				}
			});
		});
	},

	deleteProduct: id => {
		let sql = `DELETE FROM products WHERE product_id = ${connection.escape(
			id
		)} LIMIT 1;`;

		console.log(sql);
		return new Promise((resolve, reject) => {
			connection.query(sql, (err, result) => {
				if (!err) {
					resolve({ status: "success" });
				} else {
					resolve({ status: "error", err: err });
				}
			});
		});
	}
};

const populateProduct = row => {
	const product = {
		product_id: row.product_id,
		product_name: row.product_name,
		price: row.price,
		SKU: row.SKU,
		created_at: row.created_at,
		in_stock: row.in_stock === 1,
		picture: row.picture,
		description: row.description,
		discount: row.discount === 1,
		featured: row.featured === 1,
		category: row.category,
		quantity_in_stock: row.quantity_in_stock,
		discount_available: row.discount_available === 1,
		sold_by: row.sold_by
	};

	return product;
};

const product_schema = {
	product_name: Joi.string()
		.min(3)
		.required(),
	price: Joi.number()
		.min(1)
		.required(),
	SKU: Joi.number()
		.min(2)
		.required()
};

module.exports = { products: products, product_schema: product_schema };
