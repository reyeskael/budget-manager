import mongoose from "mongoose";
import { budgetingModel, monthlyBudgetingModel } from "../model/budgetingModel.js";
import { ERROR_MESSAGE } from "../config/constant.js";

export const retrieveBudgeting = async (req, res) => {
    try {
        const { profileId } = req;
        const { date } = req.query;

        const pipeline = [
            {
                $match: {
                    profileId: new mongoose.Types.ObjectId(profileId)
                }
            },
            {
                $lookup: {
                    from: 'monthlybudgetings',
                    localField: '_id',
                    foreignField: 'budgetingId',
                    as: 'monthlyBudgetingData'
                }
            },
            {
                $lookup: {
                    from: 'budgetcategories',
                    localField: 'budgetCategoryId',
                    foreignField: '_id',
                    as: 'budgetCategoryData'
                }
            },
            {
                $addFields: {
                    budgetCategoryData: { $arrayElemAt: ['$budgetCategoryData', 0] }
                }
            },
            {
                $project: {
                    _id: 1,
                    amount: 1,
                    budgetCategoryId: 1,
                    profileId: 1,
                    budgetCategory: "$budgetCategoryData.name",
                    monthlyBudgetingData: {
                        $map: {
                            input: {
                                $filter: {
                                    input: "$monthlyBudgetingData",
                                    as: "currentMonthlyBudgetData",
                                    cond: {
                                        $eq: ["$$currentMonthlyBudgetData.date", date]
                                    }
                                }
                            },
                            as: 'filteredItem',
                            in: {
                                date: "$$filteredItem.date",
                                amount: "$$filteredItem.amount"
                            }
                        }
                    }
                }
            }
        ];

        const budgeting = await budgetingModel.aggregate(pipeline);

        res.status(200).send(budgeting);
    } catch (error) {
        res.status(400).send({ errorDetails: { message: error.message } });
    }
}

export const createBudgeting = async (req, res) => {
    try {
        const { profileId } = req;
        const budgeting = await budgetingModel.create({
            ...req.body,
            profileId
        });

        res.status(200).send(budgeting);
    } catch (error) {
        res.status(400).send({ errorDetails: { message: error.message } });
    }
}

export const updateBudgeting = async (req, res) => {
    try {
        const { profileId } = req;
        const { id: budgetingId } = req.params;
        const { date, amount } = req.body;

        if (!mongoose.Types.ObjectId.isValid(budgetingId)) {
            throw new Error(ERROR_MESSAGE.BUDGET_CATEGORY.ID_FORMAT_INVALID);
        }

        const existingRecord = await monthlyBudgetingModel.findOne({ profileId, budgetingId, date });
    
        if (existingRecord) {
            existingRecord.amount = amount;
            await existingRecord.save();
        } else {
            await monthlyBudgetingModel.create({ budgetingId, amount, date, profileId });
        }

        res.status(200).send({ success: true });
    } catch (error) {
        res.status(400).send({ errorDetails: { message: error.message } });
    }
}