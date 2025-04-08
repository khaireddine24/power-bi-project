import { Request,Response } from "express";
import { PrismaClient, Role } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma =new PrismaClient();

export const getAllUsers=async (req:Request,res:Response):Promise<any>=>{
    try{
        //@ts-ignore
        const currentUserId=req.user?.id;
        //@ts-ignore
        const currentUserRole=req.user?.role;

        if(currentUserRole!=='ADMIN'){
            return res.status(403).json({message:"Not authorized as an admin"});
        }
        //Get all users from the database
        const users=await prisma.user.findMany({
            where:{
                id:{
                    not:currentUserId
                }
            },
            select:{
                id:true,
                email:true,
                name:true,
                role:true,
                createdAt:true,
                updatedAt:true
            }
        });
        res.status(200).json(users);
    }catch(err){
        console.error('Error in getAllUsers:', err);
        res.status(500).json({message:"Internal server error"});
    }
}

export const createUser=async (req:Request,res:Response):Promise<any>=>{
    try{
        //verify if the user is admin
        //@ts-ignore
        const currentUserRole=req.user?.role;
        //@ts-ignore
        if(currentUserRole!=='ADMIN'){
            return res.status(403).json({message:"Not authorized as an admin"});
        }
        const {name,email,password,role}=req.body;
        //Check if the user already exists
        const existingUser=await prisma.user.findUnique({
            where:{email}
        });
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        if(role && !Object.values(Role).includes(role)){
            return res.status(400).json({message:"Invalid role"});
        }

        //Hash the password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        
        //Create the user
        const newUser=await prisma.user.create({
            data:{
                name,
                email,
                password:hashedPassword,
                role:role as Role
            }
        });
        res.status(201).json({
            message:"User created successfully",
            user:{
                id:newUser.id,
                email:newUser.email,
                name:newUser.name,
                role:newUser.role,
                createdAt:newUser.createdAt,
                updatedAt:newUser.updatedAt
            }
        })


    }catch(err){
        console.error('Error in createUser:', err);
        res.status(500).json({message:"Internal server error in createUser"});
    }
}

export const getUserById=async(req:Request,res:Response):Promise<any>=>{
    try{
        //verify if the user is admin
        //@ts-ignore
        const currentUserRole=req.user?.role;
        //@ts-ignore
        if(currentUserRole!=='ADMIN'){
            return res.status(403).json({message:"Not authorized as an admin"});
        }
        const userId=parseInt(req.params.id);
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
        res.status(200).json(user);
    }catch(err){
        console.error('Error in getUserById:', err);
        res.status(500).json({message:"Internal server error in getUserById"});
    }
}

export const deleteUser=async(req:Request,res:Response):Promise<any>=>{
    try{
        //verify if the user is admin
        //@ts-ignore
        const currentUserRole=req.user?.role;
        //@ts-ignore
        if(currentUserRole!=='ADMIN'){
            return res.status(403).json({message:"Not authorized as an admin"});
        }
        const userId=parseInt(req.params.id);
        const user=await prisma.user.findUnique({
            where:{id:userId}
        });

        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        //@ts-ignore
        if(userId===req.user?.id){
            return res.status(400).json({message:"You cannot delete your own account"});
        }

        const userDetail=await prisma.user.delete({
            where:{id:userId}
        });
        res.status(200).json({
            message:"User deleted successfully",
            name:userDetail.name
        });
    }catch(err){
        console.error('Error in deleteUser:', err);
        res.status(500).json({message:"Internal server error in deleteUser"});
    }
}
