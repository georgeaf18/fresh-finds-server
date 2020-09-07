const mysql = require("mysql");
const Joi = require("joi");
const connection = mysql.createConnection({
    host: "localhost",
    user: "guest1",
    password: "guestpass",
    database: "fresh_finds"
});
const decrypt = require("../encrypt").decrypt

const login = {
    authentificateCustomer: (username, password) => {


        let sql = `SELECT * FROM customers WHERE username = ${connection.escape(username)}`;

        return new Promise((resolve, reject) => {
            connection.query(sql, (err, row) => {
                if (err) throw err;

                if (row.length === 0) {
                    resolve({ status: 404, message: "Username Invalid" })
                } else {
                    console.log("row", row[0])
                    const decryptedPWD = decrypt(row[0].password);
                    console.log("decryptedPWD", decryptedPWD)

                    if (decryptedPWD === password) {
                        //TO DO don't return the credentials to the front-end
                        resolve({ status: true, customer: row[0] });
                    } else {
                        resolve({ status: 401, message: "Wrong Password" })
                    }
                }
            })
        })
    }
}

module.exports = login