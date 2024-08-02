import { Router } from "express";
import { addUser, getProfile, login, logout, signup } from "../controllers/user_controllers.js";
import { hasPermission, isAuthenticated } from "../middlewares/auth.js";



export const userRouter = Router();

userRouter.post ("/users/auth/signup", signup)
userRouter.post ("/users/auth/token/login", login)
userRouter.get ("/users/auth/profile", isAuthenticated, getProfile)
userRouter.post ("/users/auth/logout",isAuthenticated, logout)
userRouter.post ("/users", isAuthenticated, hasPermission('create_user'), addUser)