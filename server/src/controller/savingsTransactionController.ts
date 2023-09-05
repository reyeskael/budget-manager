import mongoose from "mongoose";
import { savingsTransactionModel } from "../model/savingsTransactionModel.js";
import { ERROR_MESSAGE } from "../config/constant.js";

export const retrieveAllSavingsTransactions = async (req, res) => {
    try {
        const { profileId } = req;
        const { savingsId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(savingsId)) {
            throw new Error(ERROR_MESSAGE.SAVINGS.ID_FORMAT_INVALID);
        }

        const savings = await savingsTransactionModel.find({ savingsId, profileId });

        if (!savings) {
            throw new Error(ERROR_MESSAGE.SAVINGS.NOT_FOUND);
        }

        return res.status(200).send(savings);
    } catch (error) {
        res.status(400).send({ errorDetails: { message: error.message } });
    }
}

export const createSavingsTransactions = async (req, res) => {
    try {
        const { profileId } = req;
        const savings = await savingsTransactionModel.create({
            ...req.body,
            profileId
        });

        res.status(200).send(savings);
    } catch (error) {
        res.status(400).send({ errorDetails: { message: error.message } });
    }
}