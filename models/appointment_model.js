import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const appointmentSchema = new Schema({
  userId: { type: Types.ObjectId, ref: "User" },
  therapistId: { type: Types.ObjectId, ref: "User" },
  appointmentDateTime: { type: Date, required: true },  
  communicationMethod: { type: String, enum: ["Video Call", "Phone Call"], required: true },
}, {
  timestamps: true
});

appointmentSchema.plugin(toJSON);
export const AppointmentModel = model("Appointment", appointmentSchema);
