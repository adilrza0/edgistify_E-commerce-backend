const express = require("express");
const { getProducts } = require("../controllers/product.controller");
const productRouter = express.Router();
productRouter.get("/",getProducts)
module.exports = productRouter;