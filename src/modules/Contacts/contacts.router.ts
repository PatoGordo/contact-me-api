import { Router } from "express";
import Controller from "./contacts.controller";
import Validators from "./contacts.validator";

const routes = Router();

routes.get("/contacts/get/all/:key", Validators.get, Controller.get);
routes.get("/contacts/get/:key/:id", Validators.getOne, Controller.getOne);
routes.post("/contacts/set", Validators.set, Controller.set);
routes.get("/contacts/delete/:key/:id", Validators.delete, Controller.delete);

export default routes;
