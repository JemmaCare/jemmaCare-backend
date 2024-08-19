import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";





const therapistProfileSchema = new Schema({
    profilePicture: { type: String },
    expertise: { type: [String], enum: ["Bipolar", "Depression", "Psychosis","Anxiety", "Personality disorders", "Schizophrenia", "Body Dysmorphic Disorder", "Obsessive Compulsive Disorder", "Postpartum Depression"], required: true },
    overview: { type: String, required: true },
    nationality:  { type: String, enum: ["Ghana", "Nigeria", "Zimbabwe",  "Uganda"], required: true },
    phone: { type: String },
    address: { type: String },
    gender: { type: String, enum: ["male", "female"] },
    experienceYears: { type: Number, required: true },
    userId: { type: Types.ObjectId, ref: 'User', select: true }
}, {
    timestamps: true
});

therapistProfileSchema.plugin(toJSON);
export const TherapistProfileModel = model("TherapistProfile", therapistProfileSchema);