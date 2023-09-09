import mongoose from "mongoose";

const Schema = mongoose.Schema;

const budgetingSchema = new Schema({
    budgetCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "budgetCategory"
    },
    amount: {
        type: Number,
        required: true
    },
    profileId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "profile"
    }
}, { timestamps: true });


const monthlyBudgetingSchema = new Schema({
    budgetingId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "budgeting"
    },
    date: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    profileId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "profile"
    }
}, { timestamps: true });

export const budgetingModel =  mongoose.model("budgeting", budgetingSchema);
export const monthlyBudgetingModel =  mongoose.model("monthlyBudgeting", monthlyBudgetingSchema);