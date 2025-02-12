const  Product  = require("../models/product.model.");

const getProducts= async (req, res) => {
    console.log("sdf")
    try {
        
      const products = await Product.find();
      res.json(products);
    } catch (error) {
        console.log(error)
      res.status(500).json({ error: error.message });
    }
};

module.exports = { getProducts }