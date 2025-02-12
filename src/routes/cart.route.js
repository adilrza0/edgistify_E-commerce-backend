const express = require("express");
const { addProductToCart, getCart, modifyProductQuantity, deleteProductFromCart } = require("../controllers/cart.controller");
const cartRouter = express.Router();
cartRouter.post("/add-product", addProductToCart )
cartRouter.get("/",getCart)
cartRouter.post("/modify-product-quantity",modifyProductQuantity)
cartRouter.post("/delete-product",deleteProductFromCart)

module.exports = cartRouter;