const { postModel } = require("../model/posts.model")


const addPosts=async(req,res)=>{
   

console.log(req.body);
    //   const {user_id}=req.body;
    //   const {user}=req.body;
        
    try {

        const post= await new postModel(
          req.body
        )
        console.log(post);
        await post.save();

        res.status(200).json({msg:"Post added successfully", post:req.body})
        
    } catch (error) {
        res.status(400).json({error:error.message})
    }

}




const getPosts=async(req,res)=>{
    const page=req.query.page||0;
    const perPage=3;

    const {userId}=req.body

    try {
        const allPosts=await postModel.find({userId})
        .skip(page*perPage)
        .limit(perPage)
        res.status(200).json({posts:allPosts})
        
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}


const deletePost=async(req,res)=>{
       const userIdInUserDoc=req.body.user_id;
       const {postId}=req.params;

       try {

        const post=await postModel.findOne({_id:postId});
        const userIdInPostDoc=post.user_id;

        if(userIdInPostDoc===userIdInUserDoc){
            await postModel.findByIdAndDelete({_id:postId});
            res.status(200).json({msg:"post has been deleted successfully"})
        }else{
            res.status(201).json({msg:"User is not authorized"})
        }
        
       } catch (error) {
        res.status(400).json({error:error.message})
       }

}

const updatePosts=async(req,res)=>{
    const userIdInUserDoc=req.body.user_id;
    const {postId}=req.params;

    try {
        const post=await postModel.findOne({_id:postId});
        const userIdInPostDoc=post.user_id;
if(userIdInPostDoc===userIdInUserDoc){
            await postModel.findByIdAndUpdate({_id:postId},req.body);
            res.status(200).json({msg:"post has been updated successfully"})
        }else{
            res.status(201).json({msg:"User is not authorized"})
        }
        

        
    } catch (error) {
        res.status(400).json({error:error.message})
    }


}

module.exports={
    addPosts,
    getPosts,
    deletePost
}