import { Router } from "express";
import { login, logout, signup } from "../controllers/user_controllers.js";
import { isAuthenticated } from "../middlewares/auth.js";



export const userRouter = Router();

userRouter.post ("/users/auth/signup", signup)
userRouter.post ("users/auth/token/login", login)
userRouter.post ("users/auth/logout",isAuthenticated, logout)