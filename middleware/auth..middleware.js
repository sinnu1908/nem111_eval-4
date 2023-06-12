const { blModel } = require("../model/user.model");
const jwt=require("jsonwebtoken");
require("dotenv").config();



const auth=async (req,res,next)=>{

    const token=req.headers.authorization.split(" ")[1];

     if(token){
        const blackListTokens=await blModel.find();
        const compareToken=blackListTokens.filter((element)=>{
            if(token===element.logoutToken){
                return true;
            }
        })

        if(compareToken.length>=1){
            res.status(201).json({msg:"User is logged out, Please login"})
        }else{

             
            try {
                
                const decode=jwt.verify(token, process.env.secreteKey);

                if(decode){
                   req.body.user_id=decode.user.userId;
                   req.body.user=decode.user.name;
                   next();
                }else{
                    res.status(201).json({msg:"user is not authorized"})
                }

            } catch (error) {
                res.status(400).json({error:error.message})
            }
        }

        
     }else{
        res.status(401).json({msg:"Access token not found"})
     }
        
    }



module.exports={
    auth
}