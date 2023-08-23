import jwt from "jsonwebtoken";

export const getToken = (req, res) => {
    const userDetails = req.body;
    console.log(userDetails);

    const token = jwt.sign(userDetails, process.env.MY_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
        httpOnly: true
    });

    res.json({ success: true });
}

export const verifyToken = (req, res, next) => {
    const { token } = req.cookies;

    try {
        const userDetails = jwt.verify(token, process.env.MY_SECRET);
    
        console.log(userDetails);
        next();
    } catch (error) {
        res.send({ error: error.message });
    }
}