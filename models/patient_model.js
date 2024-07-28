import { Schema, model, Types} from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


const patientResponseSchema = new Schema ({
    user: { type: Types.ObjectId, ref:'User', select:false},
    therapyType: {type: String, required: true},
    age: {type:Number, required:true},
    previousTherapy: {type:Boolean, required:true},
    reason: {type: String, required: true},
    feelings: {type: String, required:true}

}, {
    timestamps:true
});

 patientResponseSchema.plugin(toJSON);
export const PatientResponseModel = model("Patient", patientSchema);