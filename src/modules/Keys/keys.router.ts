import { Router } from "express";
import Controller from "./keys.controller";
import Validators from "./keys.validators";

const routes = Router();

routes.get("/keys/get/:key", Validators.getOne, Controller.getOne);
routes.get("/keys/set/:adm_key/:role", Validators.set, Controller.set);

export default routes;
