const { userModel, blModel } = require("../model/user.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")


const register=async(req,res)=>{
    const {name,email,gender,password,age,city,is_married}=req.body;

    try {
     
        if(!name || !email || !gender || !password || !age || !city){
            res.status(201).json({msg:"Please fill all the required fields"})
        }else{
          
            const userAvailable=await userModel.findOne({email});

            if(userAvailable){
                res.status(201).json({msg:"User already exist, please login"})
            }else{
                bcrypt.hash(password, 4,async(err, hash) =>{
                    // Store hash in your password DB.

                   if(hash){
                    const newUser=new userModel({
                        name,
                        email,
                        gender,
                        password:hash,
                        age,
                        city,
                        is_married
                    });
                    await newUser.save();
                    res.status(200).json({msg:"User registered successfully", user:req.body})
                   }else{

                    res.status(401).json({error:"Something went wrong, Please try after some time"})
                   }
                });
            }

        }  
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}


const login=async(req,res)=>{
    const {email,password}=req.body;

    try {

        if(!email || !password){
            res.status(201).json("Please fill all the required fields")
        }else {

         const userAvailable=await userModel.findOne({email});

         if(!userAvailable){
            res.status(401).json({msg:"User is not registered with us, Please register first"})
         }else{
           
            bcrypt.compare(password, userAvailable.password, function(err, result) {
                // result == true
                if(result){
                    const accessToken=jwt.sign(
                        {
                        user:{
                            name:userAvailable.name,
                            userId:userAvailable._id
                        }
                        },
                        process.env.secreteKey,
                        {
                        expiresIn:"240m"
                        }
                    )

                    res.status(200).json({msg:"Login succssfull", token:accessToken})

                }else if(!result){
                    res.status(201).json({msg:"Password is Incorrect"})
                }else{
                    res.status(401).json({error:"Something went wrong, Please try after some time"})
                }
            });


         }

        }
        
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}


const logout=async(req,res)=>{

    const token=req.headers.authorization.split(" ")[1];

    try {
        const blToken=new blModel({
            logoutToken:token
        });

        await blToken.save();
        res.status(200).json({msg:"Logout successfully"})
        
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports={
    register,
    login,
    logout
}