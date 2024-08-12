import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";
import { getNames } from "country-list";



export const countryNames = getNames();


const therapistProfileSchema = new Schema({
    profilePicture: { type: String },
    expertise: { type: [String], enum: ["Bipolar", "Depression", "Psychosis", "Personality disorders", "Schizophrenia", "Body Dysmorphic Disorder", "Obsessive Compulsive Disorder", "Postpartum Depression"], required: true },
    overview: { type: String, required: true },
    nationality: { type: String, enum: countryNames, required: true },
    phone: { type: String },
    languages: { type: [String], required: true },
    address: { type: String },
    gender: { type: String, enum: ["male", "female"] },
    experienceYears: { type: Number, required: true },
    userId: { type: Types.ObjectId, ref: 'User', select: true }
}, {
    timestamps: true
});

therapistProfileSchema.plugin(toJSON);
export const TherapistProfileModel = model("TherapistProfile", therapistProfileSchema);