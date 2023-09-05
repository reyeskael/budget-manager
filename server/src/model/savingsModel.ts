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
        type: String,
        required: true
    }
}, { timestamps: true });

const savingsTransactionSchema = new Schema({
    type: {
        type: String,
        enum: [ "savings", "withdrawal" ],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    note: {
        type: String
    },
    profileId: {
        type: String,
        required: true
    },
    savingsId: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const savingsModel =  mongoose.model("savings", savingsSchema);
export const savingsTransactionModel =  mongoose.model("savingsTransaction", savingsTransactionSchema);