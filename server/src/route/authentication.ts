import express from "express";
import { verifyToken } from "../controller/authenticationController.js";

export const authenticationRoute = express.Router();

authenticationRoute.get('/verifyToken', verifyToken, (req, res) => {
    res.status(200).json({ success: true });
});