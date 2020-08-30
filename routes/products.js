const express = require("express");

const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const products = require("../dbao/products").products;

router.get("/", (req, res) => {
	products.getAllProducts().then(result => {
		res.send(result);
	});

	// res.send("Hello World");
});

router.get("/:id", (req, res) => {
	products.getProduct(req.params.id).then(result => {
		if (!result.length >= 1) res.status(404).send("Product ID not found");
		res.send(result);
	});
});

router.post("/", jsonParser, (req, res) => {
	const data = req.body;
	// const validate = Joi.validate(data, product_schema)

	// if (validate.error) {
	//     res.status(400).send(validate.error)
	// }

	const product = {
		product_name: data.product_name,
		price: data.price,
		SKU: data.SKU,
		created_at: data.created_at
			? data.created_at
			: new Date()
					.toISOString()
					.replace(/T/, " ")
					.replace(/\..+/, ""),
		in_stock: data.in_stock === 1,
		picture: data.picture,
		description: data.description,
		discount: data.discount === 1,
		featured: data.featured === 1,
		category: data.category,
		quantity_in_stock: data.quantity_in_stock,
		discount_available: data.discount_available === 1,
		sold_by: data.sold_by
	};

	// res.status(202).send("Successful" + JSON.stringify(product));

	products.insertProduct(product).then(result => {
		// if (!result.length >= 1) res.status(404).send("failure");
		res.send(result);
	});
});

router.put("/:id", (req, res) => {
	const data = req.body;

	const product = {
		product_id: data.product_id,
		product_name: data.product_name,
		price: data.price,
		SKU: data.SKU,
		created_at: data.created_at
			? data.created_at
			: new Date()
					.toISOString()
					.replace(/T/, " ")
					.replace(/\..+/, ""),
		in_stock: data.in_stock === 1,
		picture: data.picture,
		description: data.description,
		discount: data.discount === 1,
		featured: data.featured === 1,
		category: data.category,
		quantity_in_stock: data.quantity_in_stock,
		discount_available: data.discount_available === 1,
		sold_by: data.sold_by
	};

	products.updateProduct(req.params.id, product).then(result => {
		// if (!result.length >= 1) res.status(404).send("Product ID not found");
		res.send(result);
	});
});

router.delete("/:id", (req, res) => {
	products.deleteProduct(req.params.id).then(result => {
		// if (!result.length >= 1) res.status(404).send("Product ID not found");
		res.send(result);
	});
});

module.exports = router;
