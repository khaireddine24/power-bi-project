import express from "express";
import { getProfile, login,logout, updateProfile } from "../controllers/authController";
import { protect } from "../middleware/authMiddleware";


const authRouter=express.Router();

authRouter.post('/login',login);
authRouter.post('/logout',logout);

authRouter.use(protect);
authRouter.get('/profile',getProfile,protect);
authRouter.put('/update-profile',updateProfile,protect);


export default authRouter;