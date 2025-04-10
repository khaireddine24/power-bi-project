import express from "express";
import { protect,adminOnly } from "../middleware/authMiddleware";

import { getAllUsers,createUser, getUserById, deleteUser, updateUser } from "../controllers/userController";

const userRouter=express.Router();

userRouter.use(protect,adminOnly);

userRouter.get('/get-all-users',getAllUsers);
userRouter.post('/create-user',createUser);

userRouter.get('/:id',getUserById);
userRouter.put('/:id',updateUser);
userRouter.delete('/:id',deleteUser);

export default userRouter;