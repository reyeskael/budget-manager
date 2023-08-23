const express = require("express");
const budgetCategoryModel = require("../model/budgetCategoryModel");
const { createBudgetCategory, retrieveAllBudgetCategory, retrieveBudgetCategory, deleteBudgetCategory, updateBudgetCategory } = require("../controller/budgetCategoryController");

const router = express.Router();

router.get('/', retrieveAllBudgetCategory);

router.get('/:id', retrieveBudgetCategory);

router.post('/', createBudgetCategory);

router.delete('/:id', deleteBudgetCategory);

router.patch('/:id', updateBudgetCategory);

module.exports = router;