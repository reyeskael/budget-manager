import * as dotenv from 'dotenv';
// Set up global configuration access
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import cors from "cors";
import { budgetCategoryRoute } from "./src/route/budgetCategory.js";
import { verifyToken } from './src/controller/authenticationController.js';
import { profileRoute } from './src/route/profile.js';
import { authenticationRoute } from './src/route/authentication.js';
import { savingsRoute } from './src/route/savings.js';
import { savingsTransactionRoute } from './src/route/savingsTransaction.js';
import { budgetingRoute } from './src/route/budgeting.js';

const app = express();

const PORT = process.env.PORT;

// It attaches the request body to the routes (req).
app.use(express.json());

// It allows to access the request.cookies
app.use(cookieParser());

app.use(cors({
	origin: 'http://localhost:3000',
	credentials: true // It allows cookies to be sent with requests
}));

// Middleware - this will run in every request.
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

// Routes
app.use('/api/budgetCategory', verifyToken, budgetCategoryRoute);
app.use('/api/budgeting', verifyToken, budgetingRoute);
app.use('/api/savings', verifyToken, savingsRoute);
app.use('/api/savingsTransaction', verifyToken, savingsTransactionRoute);
app.use('/api/token', authenticationRoute);
app.use('/api/profile', profileRoute);

// DB Connection
mongoose.connect(process.env.MONGO_URI)
	.then(() => {
		// Listen for requests.
		app.listen(PORT, () => {
			console.log(`Listening to port ${PORT}...`);
		});
	})
	.catch((error) => {
		console.error(error);
	});