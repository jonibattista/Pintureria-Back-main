import { Router } from "express";
import { add, getAllCat, update } from "./categorias.controllers";
import { authenticate, authorizedRole } from "../../authenticate.middleware";

export const routerCat= Router()

routerCat.get("/", getAllCat);

routerCat.use(authenticate)
routerCat.use(authorizedRole([1, 2]))

routerCat.post("/",add);
routerCat.patch("/:id",update);