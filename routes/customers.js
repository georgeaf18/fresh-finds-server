const express = require("express");

const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const customers = require("../dbao/customers");

router.get("/", (req, res) => {
	customers.getAllCustomers().then(result => {
		res.send(result);
	});
});

router.post("/", jsonParser, (req, res) => {
	const data = req.body;

	const customer = {
		fname: data.fname,
		mname: data.mname,
		lname: data.lname,
		username: data.username,
		password: data.password
	};

	customers.insertCustomer(customer).then(result => {
		res.send(result);
	});
});

module.exports = router;
