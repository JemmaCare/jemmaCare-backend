import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";
import mongooseErrors from "mongoose-errors";

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, lowercase: true, unique: true },
    email: { type: String, unique: true },
    password: { type: String },
    role: { type: String, enum: ['patient', 'therapist', 'admin'], default: 'patient' },
    termsAndConditions: { type: Boolean },
}, {
    timestamps: true
});


// Apply plugins
userSchema.plugin(toJSON);
userSchema.plugin(mongooseErrors)



const resetTokenSchema = new Schema({
    userId: { type: Types.ObjectId, required: true, ref: 'User' },
    expired: { type: Boolean, default: false },
    expiresAt: {
        type: Date,
        default: () => new Date().setHours(new Date().getHours() + 2)
    }
}, {
    timestamps: true
});

// Apply plugins
resetTokenSchema.plugin(toJSON);
resetTokenSchema.plugin(mongooseErrors)

// Export models
export const UserModel = model("User", userSchema);
export const ResetTokenModel = model('ResetToken', resetTokenSchema);







