const Cart = require("../models/cart.model");
const Product = require("../models/product.model.");




const getCart = async (req, res) => {
  console.log(req.query)
  try {
    const cart = await Cart.findOne({ userId: req.query.userId }).populate({
      path: "products.productId",
      model: "product",  
    });
    
    if (!cart) return res.status(400).json({ message: "Cart is empty" });
    res.json(cart);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};
const addProductToCart = async (req, res) => {
  console.log(req.body)
    try {
      const { userId, productId, quantity } = req.body;
      
      let cart = await Cart.findOne({ userId });
      if (!cart) {
        cart = new Cart({ userId, products: [{ productId, quantity }] });
      } else {
        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
        if (productIndex > -1) {
          cart.products[productIndex].quantity += quantity;
        } else {
          cart.products.push({ productId, quantity });
        }
      }
  
      await cart.save();
      res.json({ message: "Product added to cart", cart });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const modifyProductQuantity=async(req,res)=>{
    
    
    try {
      const { userId, productId, quantity } = req.body;
      
      const cart = await Cart.findOne({ userId }).populate({
        path: "products.productId",
        model: "product",  
      });
      
      
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
      cart.products.forEach((product) => {
        
        if (product.productId._id.toString() === productId) {
          product.quantity = quantity;
        }
      });
      await cart.save();
      res.json({ message: "Product quantity modified", cart });

      
    } catch (error) {
      res.status(500).json({ error: error.message });
      
    }
  };

  const deleteProductFromCart=async(req,res)=>{
    console.log(req.body)
    try {
      const { productId,userId } = req.body;
      const cart = await Cart.findOne({ userId})
      
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
      const newProducts=cart.products.filter((product) => {
        console.log(product.productId._id,productId)
        if (product.productId._id.toString() === productId) {
          console.log("deleted")
          return false;
        } else {
          return true;
        }
      });
      
      cart.products=newProducts;
      await cart.save();
      res.json({ message: "Product deleted from cart", cart });

      
    } catch (error) {
      res.status(500).json({ error: error.message });
      
    } 
  }

    

  module.exports = { addProductToCart,getCart, modifyProductQuantity, deleteProductFromCart};