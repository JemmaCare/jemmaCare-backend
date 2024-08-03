import { Router } from "express";
import { createProfile, deleteProfile, getProfileById, getProfiles, updateProfile } from "../controllers/therapist_controllers.js";
import { hasPermission, isAuthenticated } from "../middlewares/auth.js";

export const therapistProfileRouter = Router();


therapistProfileRouter.post('/users/therapistprofiles', isAuthenticated, hasPermission('create_therapistProfile'), createProfile);

therapistProfileRouter.get('/users/therapistprofiles', hasPermission('get_therapistProfile'), getProfiles);

therapistProfileRouter.get('/users/therapistprofiles/:id', getProfileById);

therapistProfileRouter.patch('/users/therapistprofiles/:id', isAuthenticated, hasPermission('update_therapistProfile'), updateProfile);

therapistProfileRouter.delete('/users/therapistprofiles/:id', isAuthenticated, hasPermission('delete_therapistProfile'), deleteProfile);