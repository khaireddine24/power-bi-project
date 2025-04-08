import { Request,Response } from "express";
import bcrypt from 'bcrypt';
import { PrismaClient } from "@prisma/client";
import { generateToken } from "../utils/jwt";

const prisma=new PrismaClient();


//connect part
export const login=async (req:Request,res:Response):Promise<any>=>{
    try{
        const {email,password}=req.body;
        //Check if the user exists
        const user=await prisma.user.findUnique({
            where:{email}
        });
        if(!user){
            return res.status(401).json({message:"Invalid email or password"});
        }
        //Check if the password is correct
        const isPasswordvalid=await bcrypt.compare(password,user.password);
        if(!isPasswordvalid){
            return res.status(401).json({message:"Invalid email or password"});
        }

        //Generate token
        const token=generateToken(user.id);
        //Set the token in the cookie
        res.cookie('token',token,{
            httpOnly:true,
            secure:true,
            sameSite:'strict',
            maxAge:7*24*60*60*1000 //7 days
        });
        //Send the user data and token
        res.status(200).json({
            token:token,
            id:user.id,
            email:user.email,
            name:user.name,
            role:user.role
        });
    }catch(err){
        console.error('Error in login:', err);
        res.status(500).json({message:"Internal server error"});
    }
}

export const logout=(req:Request,res:Response)=>{
    res.clearCookie('token');
    res.status(200).json({message:"Logout successful"});
}