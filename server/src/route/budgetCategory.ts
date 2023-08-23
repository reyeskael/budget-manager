import express from "express";
import { createBudgetCategory, retrieveAllBudgetCategory, retrieveBudgetCategory, deleteBudgetCategory, updateBudgetCategory } from "../controller/budgetCategoryController.js";

export const budgetCategoryRoute = express.Router();

budgetCategoryRoute.get('/', retrieveAllBudgetCategory);

budgetCategoryRoute.get('/:id', retrieveBudgetCategory);

budgetCategoryRoute.post('/', createBudgetCategory);

budgetCategoryRoute.delete('/:id', deleteBudgetCategory);

budgetCategoryRoute.patch('/:id', updateBudgetCategory);