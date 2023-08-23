import express from "express";
import { getToken } from "../controller/authenticationController.js";

export const authenticationRoute = express.Router();

authenticationRoute.post('/', getToken);