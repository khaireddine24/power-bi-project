import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const prisma=new PrismaClient();

async function main(){
    //verify if the user already exists (Role is Admin)
    const adminExists=await prisma.user.findFirst({
        where:{
            role:'ADMIN'
        }
    });
    if(adminExists){
        console.log("admin exist in the database");
        return ;
    }
    //create admin user
    const adminEmail=process.env.ADMIN_EMAIL || "admin@exemple.com";
    const adminPassword=process.env.ADMIN_PASSWORD || "admin@123";
    const adminName=process.env.ADMIN_NAME || "admin";  

    //hash the password
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(adminPassword,salt);

    const admin =await prisma.user.create({
        data:{
            email:adminEmail,
            password:hashedPassword,
            name:adminName,
            role:'ADMIN'
        }
    });

    console.log("Admin user created:",admin);
}

main()
.catch((e)=>{
    console.error(e);
    process.exit(1);
})
.finally(async ()=>{
    await prisma.$disconnect();
})
