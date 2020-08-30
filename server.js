const express = require("express");
const Joi = require("joi");
const app = express();
app.use(express.json);
const port = process.env.PORT || 3000;
const productsRoute = require("./routes/products");

app.use("/api/products", productsRoute);

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});
