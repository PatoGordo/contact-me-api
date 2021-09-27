import { Router } from "express";
import ContactsRouter from "../modules/Contacts/contacts.router";
import KeysRouter from "../modules/Keys/keys.router";

const routes = Router();

routes.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello world",
  });
});

routes.use(ContactsRouter);
routes.use(KeysRouter);

export { routes };
