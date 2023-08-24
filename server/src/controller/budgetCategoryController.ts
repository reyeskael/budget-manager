import mongoose from "mongoose";
import { budgetCategoryModel } from "../model/budgetCategoryModel.js";
import { ERROR_MESSAGE } from "../config/constant.js";

export const retrieveAllBudgetCategory = async (req, res) => {
    try {
        const budgetCategories = await budgetCategoryModel.find({}).sort({createdAt: -1});

        res.status(200).json(budgetCategories);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const retrieveBudgetCategory = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error(ERROR_MESSAGE.BUDGET_CATEGORY.ID_FORMAT_INVALID);
        }

        const budgetCategory = await budgetCategoryModel.find({ _id: id });

        if (!budgetCategory) {
            throw new Error(ERROR_MESSAGE.BUDGET_CATEGORY.NOT_FOUND);
        }

        return res.status(200).json(budgetCategory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const createBudgetCategory = async (req, res) => {
    try {
        const { name, code } = req.body;
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
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error(ERROR_MESSAGE.BUDGET_CATEGORY.ID_FORMAT_INVALID);
        }

        const budgetCategory = await budgetCategoryModel.findOneAndDelete({ _id: id });

        if (!budgetCategory) {
            throw new Error(ERROR_MESSAGE.BUDGET_CATEGORY.NOT_FOUND);
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
            throw new Error(ERROR_MESSAGE.BUDGET_CATEGORY.ID_FORMAT_INVALID);
        }

        const budgetCategory = await budgetCategoryModel.findOneAndUpdate({ _id: id }, {
            ...req.body
        });

        if (!budgetCategory) {
            throw new Error(ERROR_MESSAGE.BUDGET_CATEGORY.NOT_FOUND);
        }

        return res.status(200).json(budgetCategory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}