import mongoose from "mongoose";

const Schema = mongoose.Schema;

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

export const savingsTransactionModel =  mongoose.model("savingsTransaction", savingsTransactionSchema);