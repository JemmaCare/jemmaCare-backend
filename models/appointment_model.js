import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const appointmentSchema = new Schema ({
  patientId: {type:Types.ObjectId, ref:"User", required: true},
  therapistId:{type:Types.ObjectId, ref:"User", required: true},
  date: {type:Date, required: true},
  time: {type: String, required: true},
  status: {type:String, enum: ["pending", "confirmed", "cancelled"], default:"pending"}
},{
    timestamps:true
});


appointmentSchema.plugin(toJSON);
export const AppointmentModel = model("Appointment", appointmentSchema);