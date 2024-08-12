import { Router } from "express";
import { login, signup } from "../controllers/admin_controllers.js";


export const adminRouter = Router()

adminRouter.post('/users/admin/signup', signup);

adminRouter.post('/users/admin/login', login);

