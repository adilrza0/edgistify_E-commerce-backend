// routes/auth.js
const express = require("express");
const { userRegiter, userLogin } = require("../controllers/user.controller");


const userRouter = express.Router();

userRouter.post("/register", userRegiter);
userRouter.post("/login", userLogin );
  
  module.exports = userRouter;
  
