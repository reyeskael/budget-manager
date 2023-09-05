import express from "express";
import { createSavings, retrieveAllSavings, retrieveSavings, deleteSavings, updateSavings } from "../controller/savingsController.js";

export const savingsRoute = express.Router();

savingsRoute.get('/', retrieveAllSavings);

savingsRoute.get('/:id', retrieveSavings);

savingsRoute.post('/', createSavings);

savingsRoute.delete('/:id', deleteSavings);

savingsRoute.patch('/:id', updateSavings);