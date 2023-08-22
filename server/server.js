require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const expenseRoute = require("./route/expense");
const budgetCategoryRoute = require("./route/budgetCategory");

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