import jwt from "jsonwebtoken";

export const getToken = (req, res) => {
    const userDetails = req.profileDetails;

    const token = jwt.sign(userDetails, process.env.MY_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
        httpOnly: true
    });

    res.status(200).json({ success: true });
}

export const verifyToken = (req, res, next) => {
    const { token } = req.cookies;

    try {
        jwt.verify(token, process.env.MY_SECRET);

        next();
    } catch (error) {
        res.send({ error: error.message });
    }
}