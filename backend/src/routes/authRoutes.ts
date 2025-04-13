import express from "express";
import { getProfile, login,logout, requestPasswordReset, resetPassword, updateProfile, verifyOTP } from "../controllers/authController";
import { protect } from "../middleware/authMiddleware";


const authRouter=express.Router();

authRouter.post('/login',login);
authRouter.post('/logout',logout);
authRouter.post('/forgot-password',requestPasswordReset);
authRouter.post('/verify-otp',verifyOTP);
authRouter.post('/reset-password',resetPassword);

authRouter.use(protect);
authRouter.get('/profile',getProfile,protect);
authRouter.put('/update-profile',updateProfile,protect);


export default authRouter;