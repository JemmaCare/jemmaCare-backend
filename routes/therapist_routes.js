import { Router } from "express";
import { createProfile, deleteProfile, getProfileById, getProfiles, loginTherapist, updateProfile } from "../controllers/therapist_controllers.js";
import { hasPermission, isAuthenticated } from "../middlewares/auth.js";
import { remoteUpload } from "../middlewares/uploads.js";

export const therapistProfileRouter = Router();

therapistProfileRouter.post('/users/therapistprofiles/login', loginTherapist);

therapistProfileRouter.post('/users/therapistprofiles', isAuthenticated, hasPermission('create_therapistprofile'), remoteUpload.single('profilePicture'), createProfile);

therapistProfileRouter.get('/users/therapistprofiles', isAuthenticated, hasPermission('get_therapistprofiles'), getProfiles);

therapistProfileRouter.get('/users/therapistprofiles/:id', getProfileById);

therapistProfileRouter.patch('/users/therapistprofiles/:id', isAuthenticated, hasPermission('update_therapistprofile'), updateProfile);

therapistProfileRouter.delete('/users/therapistprofiles/:id', isAuthenticated, hasPermission('delete_therapistprofile'), deleteProfile);