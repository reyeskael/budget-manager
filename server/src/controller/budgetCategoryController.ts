import mongoose from "mongoose";
import { budgetCategoryModel } from "../model/budgetCategoryModel.js";

export const retrieveAllBudgetCategory = async (req, res) => {
    try {
        const budgetCategories = await budgetCategoryModel.find({}).sort({createdAt: -1});

        res.status(200).json(budgetCategories);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const retrieveBudgetCategory = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid ID format." });
        }

        const budgetCategory = await budgetCategoryModel.find({ _id: id });

        if (!budgetCategory) {
            return res.status(400).json({ error: "Unable to find budget category." });
        }

        return res.status(200).json(budgetCategory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const createBudgetCategory = async (req, res) => {
    const { name, code } = req.body;
    try {
        const budgetCategory = await budgetCategoryModel.create({
            name,
            code
        });

        res.status(200).json(budgetCategory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const deleteBudgetCategory = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid ID format." });
        }

        const budgetCategory = await budgetCategoryModel.findOneAndDelete({ _id: id });

        if (!budgetCategory) {
            return res.status(400).json({ error: "Unable to find budget category." });
        }

        return res.status(200).json(budgetCategory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const updateBudgetCategory = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid ID format." });
        }

        const budgetCategory = await budgetCategoryModel.findOneAndUpdate({ _id: id }, {
            ...req.body
        });

        if (!budgetCategory) {
            return res.status(400).json({ error: "Unable to find budget category." });
        }

        return res.status(200).json(budgetCategory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}