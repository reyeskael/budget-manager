import * as dotenv from 'dotenv';
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import { expenseRoute } from "./src/route/expense.js";
import { budgetCategoryRoute } from "./src/route/budgetCategory.js";

const app = express();

const PORT = process.env.PORT;

// It attaches the request body to the routes (req).
app.use(express.json());

// Middleware - this will run in every request.
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

// Routes
app.use('/api/expense', expenseRoute);
app.use('/api/budgetCategory', budgetCategoryRoute);

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