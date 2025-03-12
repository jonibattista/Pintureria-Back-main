import { Router } from "express";
import { add, getAllCat, update } from "./categorias.controllers.js";
import { authenticate, authorizedRole } from "../../authenticate.middleware.js";

export const routerCat= Router()

routerCat.get("/", getAllCat);

routerCat.use(authenticate)
routerCat.use(authorizedRole([1, 2]))

routerCat.post("/",add);
routerCat.patch("/:id",update);