const express =require('express')
const userRouter = require('./user.route')
const cartRouter = require('./cart.route')
const orderRouter = require('./order.route')
const productRouter = require('./products.route')
const router=express.Router()
router.get("/",(req,res)=>{
    res.send("Hello World")
})
router.use("/products",productRouter)
router.use("/auth",userRouter)
router.use("/cart",cartRouter)
router.use("/orders",orderRouter)

module.exports=router