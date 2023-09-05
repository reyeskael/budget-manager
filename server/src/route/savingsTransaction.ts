import express from "express";
import { createSavingsTransactions, retrieveAllSavingsTransactions } from "../controller/savingsTransactionController.js";

export const savingsTransactionRoute = express.Router();

savingsTransactionRoute.get('/:savingsId', retrieveAllSavingsTransactions);

savingsTransactionRoute.post('/', createSavingsTransactions);