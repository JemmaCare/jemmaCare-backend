import { Schema,model,Types } from "mongoose";
import {toJSON} from "@reis/mongoose-to-json";

const userSchema = new Schema ({
    firstName: { type: String },
    lastName: { type: String },
    otherNames: { type: String },
    username: { type: String, lowercase: true, unique: true },
    email: { type: String, unique: true },
    termsAndConditions: { type: Boolean },
    password: { type: String }
} , {
    timestamps:true
});

userSchema.plugin(toJSON);
export const UserModel = ("User", userSchema);
