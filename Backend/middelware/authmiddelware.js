import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const verifyToken = (req,res,next)=>{
    const authHeaders = req.header.authorization;

    if(!authHeaders){
        return res.status(400).json({messsgae:"No Token Provided"})
    }

    const token = authHeaders.split(" ")[1];

    try{
        const decoded=jwt.verify(token,process.env.SECRET_KEY);
        req.user = decoded;
        next()
    }catch(err){
        return res.status(500).json({success:false,message:"Invalid or Expired token"})
    }
}