const express=require('express');
const { register, login, logout } = require('../controller/user.controller');

const userRouter=express.Router();

userRouter.post("/user/register",register);
userRouter.post("/user/login",login);
userRouter.post("/logout",logout);


module.exports={
    userRouter
}