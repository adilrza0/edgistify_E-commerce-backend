const { default: mongoose } = require("mongoose");
const Cart = require("../models/cart.model");
const Order = require("../models/order.model");

const getOrders = async (req, res) => {
  console.log(req.params.userId)

  try {
    const { userId } = req.query;
    console.log("Received userId:", userId);
  
    // Convert to ObjectId if stored as an ObjectId in MongoDB
    // const objectId = new mongoose.Types.ObjectId(userId);
  
    const orders = await Order.find({ userId });
    console.log("Orders found:", orders);
  
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: error.message });
  }
}

const placeOrder= async (req, res) => {
  console.log(req.body)
    try {
      const { userId, shippingAddress } = req.body;
      
      const cart = await Cart.findOne({ userId }).populate({
        path: "products.productId",
        model: "product",  
      });
      if (!cart || cart.products.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
      }
  
      const totalPrice = cart.products.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);
      
      const order = new Order({
        userId,
        products: cart.products.map(item => ({
          productId: item.productId._id,
          quantity: item.quantity,
          price: item.productId.price,
        })),
        totalPrice,
        shippingAddress,
      });
  
      await order.save();
      await Cart.findOneAndDelete({ userId });
  
      res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports = {getOrders, placeOrder };