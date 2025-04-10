import express from "express";
import { getProfile, login,logout } from "../controllers/authController";
import { protect } from "../middleware/authMiddleware";


const authRouter=express.Router();

authRouter.post('/login',login);
authRouter.post('/logout',logout);

authRouter.use(protect);
authRouter.get('/profile',getProfile,protect);


export default authRouter;