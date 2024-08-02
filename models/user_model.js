import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const userSchema = new Schema({
    firstName: { type: String, required:true},
    lastName: { type: String, required:true },
    username: { type: String, lowercase: true, unique: true },
    email: { type: String, unique: true },
    password: { type: String },
    role: { type: String, enum: ['patient', 'therapist', 'admin'], default: 'patient' },
    termsAndConditions: { type: Boolean },
}, {
    timestamps: true
});

userSchema.plugin(toJSON);
export const UserModel = model("User", userSchema);







