import express from "express";
import { computeTotalTransactions, createSavingsTransactions, retrieveAllSavingsTransactions } from "../controller/savingsTransactionController.js";

export const savingsTransactionRoute = express.Router();

savingsTransactionRoute.get('/computeTotalTransactions', computeTotalTransactions);

savingsTransactionRoute.get('/:savingsId', retrieveAllSavingsTransactions);

savingsTransactionRoute.post('/', createSavingsTransactions);