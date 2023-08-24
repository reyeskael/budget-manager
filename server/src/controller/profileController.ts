import bcrypt from "bcrypt";
import { profileModel } from "../model/profileModel.js";
import { Profile } from "../types";

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
            return res.status(400).json({ error: "Username is already taken." });
        }
        const encyptedPassword = passwordEncryption(password);

        await profileModel.create({
            ...profileDetails,
            password: encyptedPassword
        });

        res.status(200).json({ success: true });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const profileDetails = await profileModel.find({ username });
        if (profileDetails?.length === 0) {
            throw new Error("Unable to find username.");
        }
        if (!verifyPassword(password, profileDetails[0].password)) {
            throw new Error("Incorrect password");
        }

        req.profileDetails = {
            name: profileDetails[0].name,
            username: profileDetails[0].username
        };
        next();
    } catch (error) {
        res.clearCookie("token");
        res.status(400).json({ error: error.message });
    }
}

export const updatePassword = async (req, res) => {
    try {
        const { username, password, newPassword } = req.body;
        const profileDetails = await profileModel.find({ username });
        if (profileDetails?.length === 0) {
            return res.status(400).json({ error: "Unable to find username." });
        }
        if (!verifyPassword(password, profileDetails[0].password)) {
            return res.status(400).json({ error: "Incorrect password." });
        }
        const encyptedPassword = passwordEncryption(newPassword);

        await profileModel.findOneAndUpdate({ username }, {
            password: encyptedPassword
        });

        res.status(200).json({ success: true });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}