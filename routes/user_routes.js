import { Router } from "express";
import { addUser, deleteUser, getProfile, getUsers, login, logout, resetPassword, signup, updateUser, verifyResetToken } from "../controllers/user_controllers.js";
import { hasPermission, isAuthenticated } from "../middlewares/auth.js";



export const userRouter = Router();

userRouter.post ("/users/auth/signup", signup)

userRouter.post ("/users/auth/token/login", login)

userRouter.get ("/users/auth/profile", isAuthenticated, getProfile)

userRouter.post ("/users/auth/logout",isAuthenticated, logout)

userRouter.post("/users/reset-token/:id", verifyResetToken)

userRouter.post("/users/reset-password", resetPassword)

userRouter.post ("/users", isAuthenticated, hasPermission('create_user'), addUser)

userRouter.get("/users", isAuthenticated, hasPermission('read_users', getUsers))

userRouter.patch("/users/:id", isAuthenticated, hasPermission('update_user'), updateUser)

userRouter.delete("/users/:id", isAuthenticated, hasPermission('delete_user'), deleteUser);
