import * as dotenv from 'dotenv';
// Set up global configuration access
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import { expenseRoute } from "./src/route/expense.js";
import { budgetCategoryRoute } from "./src/route/budgetCategory.js";
import { authenticationRoute } from './src/route/authentication.js';
import { verifyToken } from './src/controller/authenticationController.js';

const app = express();

const PORT = process.env.PORT;

// It attaches the request body to the routes (req).
app.use(express.json());

// It allows to access the request.cookies
app.use(cookieParser());

// Middleware - this will run in every request.
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

// Routes
app.use('/api/expense', expenseRoute);
app.use('/api/budgetCategory', verifyToken, budgetCategoryRoute);
app.use('/api/getToken', authenticationRoute);

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