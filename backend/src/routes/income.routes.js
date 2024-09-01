import { Router } from "express";
import { createIncome, deleteIncome, getIncomesByUserId, getTotalIncomeByUserId, updateIncome } from "../controllers/income.controllers.js";
import { validateIncome } from "../validations/income.validation.js";

const routerIncome = Router();

routerIncome.post('/createIncome', validateIncome, createIncome);
routerIncome.get('/getIncomesByUserId/:id', getIncomesByUserId);
routerIncome.delete('/deleteIncome/:id', deleteIncome);
routerIncome.put('/updateIncome/:id', updateIncome);
routerIncome.get('/getTotalIncomeByUserId/:id', getTotalIncomeByUserId);

export default routerIncome;