import jwt from "jsonwebtoken";
import { ERROR_MESSAGE } from "../config/constant.js";

export const getToken = (req, res) => {
    const userDetails = req.profileDetails;

    const token = jwt.sign(userDetails, process.env.MY_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
        httpOnly: true
    });

    res.status(200).json({ success: true });
}

export const verifyToken = (req, res, next) => {
    try {
        const { token } = req.cookies;
        const decoded = jwt.verify(token, process.env.MY_SECRET);

        console.log(decoded);
        req.profileId = decoded._id;
        next();
    } catch (error) {
        res.clearCookie("token");
        if (error.message === "jwt must be provided") {
            res.status(400).send({ errorDetails: { message: ERROR_MESSAGE.AUTHENTICATION.TOKEN_NOT_FOUND } });
        } else if (error.message === "jwt expired") {
            res.status(400).send({ errorDetails: { message: ERROR_MESSAGE.AUTHENTICATION.TOKEN_EXPIRED } });
        }else {
            res.status(400).send({ errorDetails: { message: error.message } });
        }
    }
}