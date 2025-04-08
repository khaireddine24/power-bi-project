import { Request,Response,NextFunction } from "express";

import { verifyToken } from "../utils/jwt";
import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient();


export const protect=async(req:Request,res:Response,next:NextFunction):Promise<any> =>{
    try{
        const token=req.cookies.token || req.headers.authorization?.split(' ')[1];
        if(!token){
            res.status(401).json({message:"Not authorized, no token"});
        }
        //verify Token
        const decoded=verifyToken(token);
        if(!decoded){
            res.status(401).json({message:"Not authorized, token failed"});
        }
        //Get user from token
        const user=await prisma.user.findUnique({
            where:{id:decoded.userId},
            select:{
                id:true,
                email:true,
                name:true,
                role:true
            }
        });
        if(!user){
            res.status(401).json({message:"User not found"});
        }
        //@ts-ignore
        req.user=user;
        next();
    }catch(err){
        console.error('Error in protect middleware:', err);
        res.status(401).json({message:"Not authorized, token failed"});
    }
}

export const adminOnly=async (req:Request,res:Response,next:NextFunction): Promise<any>=>{
    try{
        //@ts-ignore
        if(req.user?.role!=='ADMIN'){
            return res.status(403).json({message:"Not authorized as an admin"});
        }
        next();
    }catch(err){
        console.error('Error in adminOnly middleware:', err);
        res.status(401).json({message:"Not authorized, token failed"});
    }
}

export const managerOnly=async(req:Request,res:Response,next:NextFunction): Promise<any>=>{
    try{
        //@ts-ignore
        if(req.user?.role!=='MANAGER'){
            return res.status(403).json({message:"Not authorized as an manager"});
        }
        next();
    }catch(err){
        console.error('Error in managerOnly middleware:', err);
        res.status(401).json({message:"Not authorized, token failed"});
    }
}