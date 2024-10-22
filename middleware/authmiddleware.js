const { request, response } = require("express");
const jwt=require('jsonwebtoken');
const authmiddleware=(request,response,next)=>{
    const token=request.header('authorization');

    if(!token){
        return response.status(401).json({message:'No token, authorization denied'});
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        request.user=decoded;
        next();
    }
    catch(error){
        return response.status(400).json({message:'Invalid token'});
    }
};

module.exports=authmiddleware;