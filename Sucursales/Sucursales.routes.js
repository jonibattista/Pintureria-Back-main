import { Router } from "express";
import { add, getAll, getOne, remove, update } from "./Sucursal.controllers.js";
import { authenticate, authorizedRole } from "../authenticate.middleware.js";
import { validateNewBranch, validateUpdateBranch } from "../middlewares/validations/branch.js";

export const routerSuc = Router();

routerSuc.use(authenticate)
routerSuc.use(authorizedRole([1]))

routerSuc.get("/", getAll);
routerSuc.get("/:id", getOne);
routerSuc.post("/", validateNewBranch, add);
routerSuc.patch("/:id", validateUpdateBranch, update);
routerSuc.delete("/:id", remove);
