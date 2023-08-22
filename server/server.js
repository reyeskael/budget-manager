require("dotenv").config();
const express = require("express");

const app = express();

const PORT = process.env.PORT;

// Middleware - this will run in every request.
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

app.get('/', (req, res) => {
	res.json({
		"test": "Hello world!"
	});
});

app.listen(PORT, () => {
	console.log(`Listening to port ${PORT}...`);
});