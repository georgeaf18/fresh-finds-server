const mysql = require("mysql");
const Joi = require("joi");
const connection = mysql.createConnection({
	host: "localhost",
	user: "guest1",
	password: "guestpass",
	database: "fresh_finds"
});

const customers = {
	getAllCustomers: () => {
		let sql = `SELECT * FROM customers;`;

		return new Promise((resolve, reject) => {
			const customers = [];

			connection.query(sql, (err, rows) => {
				if (err) throw err;

				rows.forEach(row => {
					customers.push(row);
				});
				resolve(customers);
			});
		});
	},

	getCustomer: id => {
		let sql = `SELECT * FROM customers WHERE customer_id = ${connection.escape(
			id
		)};`;

		return new Promise((resolve, reject) => {
			const customers = [];

			connection.query(sql, (err, rows) => {
				if (err) throw err;

				rows.forEach(row => {
					customers.push(row);
				});
				resolve(customers);
			});
		});
	},

	insertCustomer: customer => {
		let sql = `INSERT INTO customers (fname, mname, lname, username, password) VALUES 
		('${customer.fname}', '${customer.mname}', '${customer.lname}', '${customer.username}', '${customer.password}'
		);`;

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

const populateCustomer = row => {
	const customer = {
		customer_id: row.customer_id,
		fname: row.fname,
		mname: row.mname,
		lname: row.lname,
		street: row.street,
		city: row.city,
		state: row.state,
		zip_code: row.zip_code
	};

	return customer;
};

module.exports = customers;
