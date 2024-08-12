import { Router } from "express";
import { hasPermission, isAuthenticated } from "../middlewares/auth.js";
import { createAppointment, deleteAppointment, getAllAppointments, getAppointmentById, updateAppointment } from "../controllers/appointment_controllers.js";


export const appointmentRouter = Router();

appointmentRouter.post('/users/appointments', isAuthenticated, hasPermission('create_appointment'), createAppointment);

appointmentRouter.get('/users/appointments',isAuthenticated, hasPermission('get_appointments'), getAllAppointments);

appointmentRouter.get('/users/appointments/:id', getAppointmentById);

appointmentRouter.patch('/users/appointments/:id', isAuthenticated, hasPermission('update_appointment'), updateAppointment);

appointmentRouter.delete('/users/appointments/:id', isAuthenticated, hasPermission('delete_appointment'), deleteAppointment);