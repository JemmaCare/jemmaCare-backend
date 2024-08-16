import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";
import { getNames } from "country-list";


export const countryNames = getNames();


const patientResponseSchema = new Schema({

    therapyType: { type: String, enum: ["Bipolar", "Depression", "Psychosis", "Personality disorders", "Anxiety","Schizophrenia", "Body Dysmorphic Disorder", "Obsessive Compulsive Disorder", "Postpartum Depression"], required: true },
    age: {type: Number},
    nationality: { type: String, enum: countryNames, required: true },
    phone: { type: String },
    address: { type: String },
    gender: { type: String, enum: ["male", "female"] },
    previousTherapy: { type: Boolean, required: true },
    feelings: { type: String, required: true },
    userId: { type: Types.ObjectId, ref: 'User', select: true }

}, {
    timestamps: true
});

patientResponseSchema.plugin(toJSON);
export const PatientResponseModel = model("PatientResponse", patientResponseSchema);