import mongoose from "mongoose";

const Schema = mongoose.Schema;

const budgetCategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    profileId: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const budgetCategoryModel =  mongoose.model("budgetCategory", budgetCategorySchema);