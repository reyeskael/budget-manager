import express from "express";
import { login, registerProfile } from "../controller/profileController.js";
import { getToken } from "../controller/authenticationController.js";

export const profileRoute = express.Router();

profileRoute.post('/register', registerProfile);

profileRoute.post('/login', login, getToken);