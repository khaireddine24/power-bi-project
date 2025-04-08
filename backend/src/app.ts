import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes";
import authRouter from "./routes/authRoutes";

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
app.use('/api/users',userRouter);
app.use('/api/auth',authRouter);

export default app;