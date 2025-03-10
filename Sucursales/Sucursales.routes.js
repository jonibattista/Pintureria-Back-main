import { Router } from "express";
import { add, getAll, getOne, remove, update } from "./Sucursal.controllers.js";
import { authenticate, authorizedRole } from "../authenticate.middleware.js";

export const routerSuc = Router();

routerSuc.use(authenticate)
routerSuc.use(authorizedRole([1]))

routerSuc.get("/", getAll);
routerSuc.get("/:id", getOne);
routerSuc.post("/", add);
routerSuc.patch("/:id", update);
routerSuc.delete("/:id", remove);
