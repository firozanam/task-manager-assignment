const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");


// Registration
exports.registration = async(req, res)=>{
    try {
        let reqBody = req.body;
        await userModel.create(reqBody)
        res.json({status:"Success", message:"User Registration Completed"})
    }
    catch (err){
        res.json({status:"Fail", message:err})
    }
}


// Login
exports.login =async (req, res)=>{
    try {
        let reqBody = req.body;
        let user = await userModel.find(reqBody)
        if(user.length > 0){
            let payload = {exp:Math.floor(Date.now()/1000)+(24*60*60),data:reqBody["email"]}
            let token = jwt.sign(payload, "123-abc");
            res.json({status:"Success", message:"User found",token:token})
        }
        else{
            res.json({status:"Fail", message:"User not found"})
        }
    }
    catch (err){
        res.json({status:"Fail", message:err})
    }
}


// Profile Update
exports.profileUpdate =async (req, res)=>{
    try {
        let email = req.headers["email"];
        let reqBody = req.body;
        await userModel.updateOne({email:email},reqBody)
        res.json({status:"Success", message:"Profile Updated Successfully"})
    }
    catch (err){
        res.json({status:"Fail", message:err})
    }
}


// profile Details
exports.profileDetails =async (req, res)=>{
    try {
        let email = req.headers["email"]
        let result = await userModel.find({email:email})
        res.json({status:"Success", data:result})
    }
    catch (err){
        res.json({status:"Fail", message:err})
    }
}


