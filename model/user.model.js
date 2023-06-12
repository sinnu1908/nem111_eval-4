
const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    gender:{type:String,required:true},
    password:{type:String,required:true},
    age:{type:Number,required:true},
    city:{type:String,required:true},
    is_married:{type:Boolean}

})

const blSchema=mongoose.Schema({
    logoutToken:String
})

const userModel=mongoose.model("user",userSchema);

const blModel=mongoose.model("blackListToken",blSchema);

module.exports={
    userModel,
    blModel
}