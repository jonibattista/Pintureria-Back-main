import { Router } from "express";
import { add, getAllCat, update } from "../controllers/categorias.controllers.js";
import { authenticate, authorizedRole } from "../../authenticate.middleware.js";
import { validateNewCat, validateUpdateCat } from "../../middlewares/validations/category.js";

export const routerCat= Router()

routerCat.get("/", getAllCat);

routerCat.use(authenticate)
routerCat.use(authorizedRole([1, 2]))

routerCat.post("/",validateNewCat,add);
routerCat.patch("/:id",validateUpdateCat,update);