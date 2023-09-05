import mongoose from "mongoose";
import { budgetCategoryModel } from "../model/budgetCategoryModel.js";
import { ERROR_MESSAGE } from "../config/constant.js";

export const retrieveAllBudgetCategory = async (req, res) => {
    try {
        const { profileId } = req;
        const budgetCategories = await budgetCategoryModel.find({ profileId }).sort({createdAt: -1});

        res.status(200).send(budgetCategories);
    } catch (error) {
        res.status(400).send({ errorDetails: { message: error.message } });
    }
}

export const retrieveBudgetCategory = async (req, res) => {
    try {
        const { profileId } = req;
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error(ERROR_MESSAGE.BUDGET_CATEGORY.ID_FORMAT_INVALID);
        }

        const budgetCategory = await budgetCategoryModel.find({ _id: id, profileId });

        if (!budgetCategory) {
            throw new Error(ERROR_MESSAGE.BUDGET_CATEGORY.NOT_FOUND);
        }

        return res.status(200).send(budgetCategory);
    } catch (error) {
        res.status(400).send({ errorDetails: { message: error.message } });
    }
}

export const createBudgetCategory = async (req, res) => {
    try {
        const { profileId } = req;
        const budgetCategory = await budgetCategoryModel.create({
            ...req.body,
            profileId
        });

        res.status(200).send(budgetCategory);
    } catch (error) {
        res.status(400).send({ errorDetails: { message: error.message } });
    }
}

export const deleteBudgetCategory = async (req, res) => {
    try {
        const { profileId } = req;
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error(ERROR_MESSAGE.BUDGET_CATEGORY.ID_FORMAT_INVALID);
        }

        const budgetCategory = await budgetCategoryModel.findOneAndDelete({ _id: id, profileId });

        if (!budgetCategory) {
            throw new Error(ERROR_MESSAGE.BUDGET_CATEGORY.NOT_FOUND);
        }

        return res.status(200).send(budgetCategory);
    } catch (error) {
        res.status(400).send({ errorDetails: { message: error.message } });
    }
}

export const updateBudgetCategory = async (req, res) => {
    try {
        const { profileId } = req;
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error(ERROR_MESSAGE.BUDGET_CATEGORY.ID_FORMAT_INVALID);
        }

        const budgetCategory = await budgetCategoryModel.findOneAndUpdate({ _id: id, profileId }, req.body);

        if (!budgetCategory) {
            throw new Error(ERROR_MESSAGE.BUDGET_CATEGORY.NOT_FOUND);
        }

        return res.status(200).send(budgetCategory);
    } catch (error) {
        res.status(400).send({ errorDetails: { message: error.message } });
    }
}