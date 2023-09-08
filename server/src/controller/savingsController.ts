import mongoose from "mongoose";
import { savingsModel } from "../model/savingsModel.js";
import { ERROR_MESSAGE } from "../config/constant.js";

export const retrieveAllSavings = async (req, res) => {
    try {
        const { profileId } = req;
        const savings = await savingsModel.find({ profileId }).sort({createdAt: -1});

        res.status(200).send(savings);
    } catch (error) {
        res.status(400).send({ errorDetails: { message: error.message } });
    }
}

export const retrieveSavings = async (req, res) => {
    try {
        const { profileId } = req;
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error(ERROR_MESSAGE.SAVINGS.ID_FORMAT_INVALID);
        }

        const savings = await savingsModel.find({ _id: id, profileId });

        if (!savings) {
            throw new Error(ERROR_MESSAGE.SAVINGS.NOT_FOUND);
        }

        return res.status(200).send(savings);
    } catch (error) {
        res.status(400).send({ errorDetails: { message: error.message } });
    }
}

export const createSavings = async (req, res) => {
    try {
        const { profileId } = req;
        const { dateToFinish } = req.body;
        const parsedDateToFinish = new Date(dateToFinish);
        const savings = await savingsModel.create({
            ...req.body,
            dateToFinish: parsedDateToFinish,
            profileId,
            test: "2"
        });

        res.status(200).send(savings);
    } catch (error) {
        res.status(400).send({ errorDetails: { message: error.message } });
    }
}

export const deleteSavings = async (req, res) => {
    try {
        const { profileId } = req;
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error(ERROR_MESSAGE.SAVINGS.ID_FORMAT_INVALID);
        }

        const savings = await savingsModel.findOneAndDelete({ _id: id, profileId });

        if (!savings) {
            throw new Error(ERROR_MESSAGE.SAVINGS.NOT_FOUND);
        }

        return res.status(200).send(savings);
    } catch (error) {
        res.status(400).send({ errorDetails: { message: error.message } });
    }
}

export const updateSavings = async (req, res) => {
    try {
        const { profileId } = req;
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error(ERROR_MESSAGE.SAVINGS.ID_FORMAT_INVALID);
        }

        const savings = await savingsModel.findOneAndUpdate({ _id: id, profileId }, {
            ...req.body
        });

        if (!savings) {
            throw new Error(ERROR_MESSAGE.SAVINGS.NOT_FOUND);
        }

        return res.status(200).send(savings);
    } catch (error) {
        res.status(400).send({ errorDetails: { message: error.message } });
    }
}