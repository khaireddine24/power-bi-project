import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();
const JWT_SECRET=process.env.JWT_SECRET;
const JWT_EXPIRES=process.env.JWT_EXPIRES;

export const generateToken=(userId:number):string =>{
    //@ts-ignore
    return jwt.sign({userId},JWT_SECRET,{expiresIn:JWT_EXPIRES});
};

export const verifyToken=(token:string): any =>{
    try{
        //@ts-ignore
        return jwt.verify(token,JWT_SECRET);
    }catch(err){    
        return null;
    }
}
