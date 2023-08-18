
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

exports.auth = async (req,res,next)=>{
    try{
        // extract token
        const token = req.cookies.token || req.body.token||req.header("Authorisation").replace("Bearer","");
        if(!token){
            return res.status(401).json({
                success:false,
                message:"tooooken is missing"
            })
        }

        // verify
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user=decode;
        }catch(error){
            return res.status(401).json({
                success:false,
                message:"token is invadid",
                
            })
        }
        next();
    }catch(error){
        return res.status(401).json({
            success:false,
            message:"while validating th token wrong something",
            
        })
    }
}


// is student
exports.isStudent = async (req,res,next)=>{
    try{
        if(req.user.accountType !== "Student" ){
            return res.status(401).json({
                success:false,
                message:"protected route for student only",
                
            })
        }
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"user roke cannot be varified",
                
        })
    }
}

exports.isInstructer = async (req,res,next)=>{
    try{
        if(req.user.accountType !== "Instructer" ){
            return res.status(401).json({
                success:false,
                message:"protected route for student only",
                
            })
        }
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"user roke cannot be varified",
                
        })
    }
}

// isAdmin
exports.isAdmin = async (req,res,next)=>{
    try{
        if(req.user.accountType !== "Admin" ){
            return res.status(401).json({
                success:false,
                message:"protected route for student only",
                
            })
        }
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"user roke cannot be varified",
                
        })
    }
}