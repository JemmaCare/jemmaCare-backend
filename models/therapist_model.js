import { Schema, model,Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


const therapistProfileSchema = new Schema ({
    user: { type: Types.ObjectId, ref:'User', select:false},
    expertise: {type:[String], required: true},
    overview: {type: String, required:true},
    gender: {type:String, enum: ["male", "female"]},
    religion:{type: String},
    experienceYears:{type:Number,required:true}
},{
   timestamps:true 
});

therapistProfileSchema.plugin(toJSON);
export const TherapistProfileModel = model("Therapist", therapistProfileSchema);