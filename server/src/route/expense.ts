import express from "express";

export const expenseRoute = express.Router();

expenseRoute.get('/', (req, res) => {
    res.json({
        "test": "get all"
    });
});

expenseRoute.get('/:id', (req, res) => {
    res.json({
        "test": "get single"
    });
});

expenseRoute.post('/', (req, res) => {
    res.json({
        "test": "post single"
    });
});

expenseRoute.delete('/:id', (req, res) => {
    res.json({
        "test": "delete single"
    });
});

expenseRoute.patch('/:id', (req, res) => {
    res.json({
        "test": "patcj single"
    });
});