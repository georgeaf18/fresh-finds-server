const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;
const productsRoute = require("./routes/products");
const customersRoute = require("./routes/customers");

app.use("/api/products", productsRoute);
app.use("/api/customers", customersRoute);

app.use((req, res, next) => {
	const error = new Error("Not found");
	error.status = 404;
	next(error);
});

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});
