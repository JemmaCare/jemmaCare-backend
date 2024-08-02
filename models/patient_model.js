import { Schema, model, Types} from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";
import { getNames } from "country-list";


export const countryNames = getNames();


const patientResponseSchema = new Schema ({
   
    therapyType: {type: String, required: true},
    age: {type:Number, required:true},
    nationality: { type: String, enum: countryNames, required: true },
    phone: { type: String },
    address: { type: String },
    gender: { type: String },
    previousTherapy: {type:Boolean, required:true},
    reason: {type: String, required: true},
    feelings: {type: String, required:true},
    user: { type: Types.ObjectId, ref:'User', select:false}

}, {
    timestamps:true
});

 patientResponseSchema.plugin(toJSON);
export const PatientResponseModel = model("PatientResponse", patientResponseSchema);