import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app=express();

// Middleware
app.use(cors({ 
    origin: process.env.FRONTEND_URL,
    credentials: true 
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//Routes


export default app;