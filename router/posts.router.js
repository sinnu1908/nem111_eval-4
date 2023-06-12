const express=require("express");
const { addPosts, getPosts } = require("../controller/posts.controller");
const {auth} =require("../middleware/auth..middleware")

const postRouter=express.Router();

postRouter.post("/posts/add",auth,addPosts);
postRouter.get("/posts",auth,getPosts);


module.exports={
    postRouter
}