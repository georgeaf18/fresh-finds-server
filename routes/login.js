const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const jwt = require("jsonwebtoken")
const customers = require("../dbao/customers")
const dbao = require("../dbao/loginDbao")

router.post("/customer", jsonParser, (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    if (username != null && (password != null)) {
        dbao.authentificateCustomer(username, password).then(result => {
            console.log("result -> ", result)
            if (result.status === true) {
                // const customer = customers.getCustomer(2);
                const customer = result.customer

                jwt.sign({ customer }, "manguconsalami", (err, token) => {
                    res.json({ token, customer })
                })
            } else {
                res.send(result)
            }
        });
    } else {
        res.status(401).send("Username and Password required")
    }
})

function verifyToken(req, res, next) {

    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader != undefined) {

    } else {
        //forbidden
        res.sendStatus(403);
    }
}

module.exports = router