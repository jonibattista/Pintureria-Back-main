import { Router } from "express";
import { routerProd } from "../models/Productos.model.js";
import { routerRecover } from "../models/recover.model.js";
import { routerUsu } from "../models/Usuario.model.js";
import { routerSuc } from "../models/Sucursal.model.js";
import { routerCli } from "../models/Cliente.model.js";
import { routerEmp } from "../models/Empleados.model.js";
import { routerSupplier } from "../models/Proveedores.model.js";
import { routerVenta } from "../models/Ventas.model.js";
import { routerRenglon } from "../models/Renglon.model.js";
import { routerCat } from "./routers/categorias.routes.js";
import { login, logout, register } from "../models/Usuario.model.js";
import { authenticate, authorizedRole } from "../middlewares/authenticate.middleware.js";
import { routerMP } from "../controllers/mercadoPago.controllers.js";
import { upload, uploadImg } from "../controllers/upload.controllers.js";

export const appRouter = Router()

appRouter.post("/register", register);
appRouter.post("/login", login);
appRouter.post("/logout", logout);
appRouter.use("/category", routerCat)
appRouter.use("/products", routerProd)
appRouter.use("/recover", routerRecover);
appRouter.use("/users", routerUsu);
appRouter.use("/sales", routerVenta);
appRouter.use("/rows", routerRenglon);
appRouter.use("/branches", routerSuc);
appRouter.use("/clients", routerCli);
appRouter.use("/employees", routerEmp);
appRouter.use("/suppliers", routerSupplier);

//ruta para cargar imagenes en la app
appRouter.post("/upload" ,authenticate, authorizedRole([1, 2]),upload.single("imagen") ,uploadImg);

appRouter.use("/mp", authenticate,routerMP);

// Ruta para verificar si el usuario está autorizado.
appRouter.get("/authorized", authenticate, (req, res) => {
  res.status(200).json(req.user);
});