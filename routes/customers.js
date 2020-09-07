const express = require("express");
const jwt = require("jsonwebtoken")
const bodyParser = require("body-parser");

const router = express.Router();
const jsonParser = bodyParser.json();

const customers = require("../dbao/customers");
const encrypt = require("../encrypt").encrypt;
const decrypt = require("../encrypt").decrypt;
// const verifyToken = require("../routes/login").verifyToken

router.get("/", verifyToken, (req, res) => {
	jwt.verify(req.token, "manguconsalami", (err, data) => {
		if (err) {
			res.sendStatus(403)
		} else {
			console.log("Session ID -> ", req.sessionID)
			customers.getAllCustomers().then(result => {
				res.send(result);
			});
		}
	})

});

router.post("/", jsonParser, (req, res) => {
	const data = req.body;

	const encryptedPWD = encrypt(data.password);

	console.log(
		"encrypted -> ",
		encryptedPWD,
		decrypt(encryptedPWD),
		data.mname.length
	);

	const customer = {
		fname: data.fname,
		mname: data.mname,
		lname: data.lname,
		username: data.username,
		password: encryptedPWD
	};

	customers.insertCustomer(customer).then(result => {
		res.send(result);
	});
});

function verifyToken(req, res, next) {
	const bearerHeader = req.headers["authorization"];

	if (typeof bearerHeader != 'undefined') {
		const bearer = bearerHeader.split(' ');

		const bearerToken = bearer[1];

		req.token = bearerToken;

		next();
	} else {
		//forbidden
		res.status(403).send("Forbidden")
	}
}

module.exports = router;
