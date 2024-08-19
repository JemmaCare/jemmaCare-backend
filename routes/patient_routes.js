import { Router } from "express";
import { hasPermission, isAuthenticated } from "../middlewares/auth.js";
import { createResponse, deleteResponse, getResponseById, getResponses, updateResponse } from "../controllers/patient_controllers.js";


export const patientResponseRouter = Router();

patientResponseRouter.post('/users/patientresponses', isAuthenticated, hasPermission('create_patientresponse'), createResponse);

patientResponseRouter.get('/users/patientresponses', isAuthenticated, hasPermission('get_patientresponses'), getResponses);

patientResponseRouter.get('/users/patientresponses/:id', getResponseById);

patientResponseRouter.patch('/users/patientresponses/:id', isAuthenticated, hasPermission('update_patientresponse'), updateResponse);

patientResponseRouter.delete('/users/patientresponses/:id', isAuthenticated, hasPermission('delete_patientresponse'), deleteResponse);

