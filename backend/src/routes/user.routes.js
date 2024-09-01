import { Router } from "express";
import { cargarImagen, changePassword, changeStatus, createUsers, deleteusers, getOneUser, getUsers, updateUser } from "../controllers/user.controllers.js";
import { userPassword, userStatus, userValidate } from "../validations/user.validation.js";

const routerUser = Router();

routerUser.get("/getusers", getUsers);
routerUser.get("/getOneUser/:id", getOneUser);
routerUser.post('/createusers', cargarImagen, userValidate, createUsers);
routerUser.put('/updateUser/:id', cargarImagen, updateUser);
routerUser.put("/changePassword/:id", userPassword, changePassword);
routerUser.delete("/deleteusers/:id", deleteusers);
routerUser.put("/changeStatus/:id", userStatus, changeStatus);

export default routerUser;