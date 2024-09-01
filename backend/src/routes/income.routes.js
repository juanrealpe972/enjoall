import { Router } from "express";
import { createIncome, deleteIncome, getIncomesByUserId, getTotalIncomeByUserId, updateIncome } from "../controllers/income.controllers.js";

const routerIncome = Router();

routerIncome.post('/createIncome', createIncome);

routerIncome.get('/getIncomesByUserId/:id', getIncomesByUserId);
routerIncome.put('/updateIncome/:id', updateIncome);
routerIncome.delete('/deleteIncome/:id', deleteIncome);
routerIncome.get('/getTotalIncomeByUserId/:id', getTotalIncomeByUserId);

export default routerIncome;