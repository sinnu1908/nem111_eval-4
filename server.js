const express=require("express");
const { connection } = require("./db");
const { userRouter } = require("./router/user.router");
const { postRouter } = require("./router/posts.router");
require("dotenv").config();
const app=express();
app.use(express.json());
app.use(userRouter);
app.use(postRouter);


app.listen(process.env.port,async()=>{

    try {
    await connection;
    console.log(`server is connected to port ${process.env.port}`);
    console.log("database is connected")
        
    } catch (error) {
        console.log(error)
    }
})