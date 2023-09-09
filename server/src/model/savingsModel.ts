import mongoose from "mongoose";

const Schema = mongoose.Schema;

const savingsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    frequency: {
        type: String,
        enum: [ "daily", "weekly", "monthly" ],
        required: true
    },
    dateToFinish: {
        type: Date,
        required: true
    },
    profileId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "profile"
    }
}, { timestamps: true });

export const savingsModel =  mongoose.model("savings", savingsSchema);