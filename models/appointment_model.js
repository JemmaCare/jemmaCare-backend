import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


const appointmentSchema = new Schema({
  userId: { type: Types.ObjectId, ref: "User" },
  therapistId: { type: Types.ObjectId, ref: "User"},
  appointmentDate: { type: Date, required: true },
  appointmentTime: { type: String, required: true },
  status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
  communicationMethod: { type: String, enum: ["Video Call", "Phone Call",], required: true },
}, {
  timestamps: true
});


appointmentSchema.plugin(toJSON);
export const AppointmentModel = model("Appointment", appointmentSchema);