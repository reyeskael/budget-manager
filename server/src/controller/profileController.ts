import bcrypt from "bcrypt";
import { profileModel } from "../model/profileModel.js";
import { Profile } from "../types";
import { ERROR_MESSAGE } from "../config/constant.js";

const passwordEncryption = (password) => {
    const saltRounds = 9;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    return hash;
}

const verifyPassword = (inputtedPassword, encyptedPassword) => {
    return bcrypt.compareSync(inputtedPassword, encyptedPassword);
}

const isUsernameExisting = async (username) => {
    const profileDetails = await profileModel.find({ username });

    if (profileDetails?.length === 0) return false;

    return true;
}

export const registerProfile = async (req, res) => {
    try {
        const profileDetails: Profile = req.body;
        const { password, username } = profileDetails;
        const isUsernameTaken = await isUsernameExisting(username);
        if (isUsernameTaken) {
            throw new Error(ERROR_MESSAGE.PROFILE.USERNAME_UNAVAILABLE);
        }
        const encyptedPassword = passwordEncryption(password);

        await profileModel.create({
            ...profileDetails,
            password: encyptedPassword
        });

        res.status(200).send({ success: true });
    } catch (error) {
        res.status(400).send({ errorDetails: { message: error.message } });
    }
}

export const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const profileDetails = await profileModel.find({ username });
        if (profileDetails?.length === 0) {
            throw new Error(ERROR_MESSAGE.PROFILE.USERNAME_NOT_FOUND);
        }
        if (!verifyPassword(password, profileDetails[0].password)) {
            throw new Error(ERROR_MESSAGE.PROFILE.PASSWORD_INCORRECT);
        }

        req.profileDetails = {
            name: profileDetails[0].name,
            username: profileDetails[0].username
        };
        next();
    } catch (error) {
        res.clearCookie("token");
        res.status(400).send({ errorDetails: { message: error.message } });
    }
}

export const updatePassword = async (req, res) => {
    try {
        const { username, password, newPassword } = req.body;
        const profileDetails = await profileModel.find({ username });
        if (profileDetails?.length === 0) {
            throw new Error(ERROR_MESSAGE.PROFILE.USERNAME_NOT_FOUND);
        }
        if (!verifyPassword(password, profileDetails[0].password)) {
            throw new Error(ERROR_MESSAGE.PROFILE.PASSWORD_INCORRECT);
        }
        const encyptedPassword = passwordEncryption(newPassword);

        await profileModel.findOneAndUpdate({ username }, {
            password: encyptedPassword
        });

        res.status(200).send({ success: true });
    } catch (error) {
        res.status(400).send({ errorDetails: { message: error.message } });
    }
}