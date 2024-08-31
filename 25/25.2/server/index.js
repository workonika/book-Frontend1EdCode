const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const {products} = require('./data/products');

app.use(express.json());

app.get("/", (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.json({"page": "first"});
});

app.get("/test-endpoint", (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.json({"test": true});
});

app.get("/products", (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.json(products);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});