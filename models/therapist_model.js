import { Schema, model,Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";
import { getNames } from "country-list";
import { required } from "joi";

 export const countryNames = getNames();


const therapistProfileSchema = new Schema ({
    profilePicture: {type: String, required: true},
    expertise: {type:[String], required: true},
    overview: {type: String, required:true},
    nationality: { type: String, enum: countryNames, required: true },
    phone: { type: String },
    address: { type: String },
    gender: {type:String, enum: ["male", "female"]},
    experienceYears:{type:Number,required:true},
    user: { type: Types.ObjectId, ref:'User', select:false}
},{
   timestamps:true 
});

therapistProfileSchema.plugin(toJSON);
export const TherapistProfileModel = model("TherapistProfile", therapistProfileSchema);