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


export const getProfile=async(req:Request,res:Response):Promise<any>=>{
    try{
        //@ts-ignore
        const userId=req.user.id;

        const user=await prisma.user.findUnique({
            where:{id:userId},
            select:{
                id:true,
                email:true,
                name:true,
                role:true,
                createdAt:true,
                updatedAt:true
            }
        });

        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        return res.status(200).json(user);
    }catch(err){
        console.error('Error in getProfile:', err);
        res.status(500).json({message:"Internal server error"});
    }
}

export const updateProfile=async(req:Request,res:Response):Promise<any>=>{
    try{
        //@ts-ignore
        const userId=req.user.id;
        const {name,email,currentPassword,newPassword}=req.body;

        //Check if the user exists
        const user=await prisma.user.findUnique({
            where:{id:userId}
        });

        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        //Object to hold the updated data
        const updateData:any={};

        //Name validation
        if(name){
            updateData.name=name;
        }

        //Email validation
        if(email && email!==user.email){
            const existingUser=await prisma.user.findUnique({
                where:{email}
            });
            if(existingUser){
                return res.status(400).json({message:"Email already exists"});
            }
            updateData.email=email;
        }

        //Password validation
        if(currentPassword && newPassword){
            const isPasswordValid=await bcrypt.compare(currentPassword,user.password);
            if(!isPasswordValid){
                return res.status(401).json({message:"Invalid current password"});
            }
            const hashedPassword=await bcrypt.hash(newPassword,10);
            updateData.password=hashedPassword;
        }

        if(Object.keys(updateData).length===0){
            return res.status(400).json({message:"No data to update"});
        }
        //Update the user
        const updateUser=await prisma.user.update({
            where:{id:userId},
            data:updateData,
            select:{
                id:true,
                email:true,
                name:true,
                role:true,
                createdAt:true,
                updatedAt:true
            }
        });
        return res.status(200).json(updateUser);
        
    }catch(err){
        console.error('Error in updateProfile:', err);
        res.status(500).json({message:"Internal server error"});
    }
}