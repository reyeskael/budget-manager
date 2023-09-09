import express from "express";
import { createBudgeting, retrieveBudgeting, updateBudgeting } from "../controller/budgetingController.js";

export const budgetingRoute = express.Router();

budgetingRoute.get('/', retrieveBudgeting);

budgetingRoute.post('/', createBudgeting);

// budgetingRoute.delete('/:id', deleteBudgetCategory);

budgetingRoute.patch('/:id', updateBudgeting);