import { Router } from "express";
import { routerCat } from "./Productos/Categorias/categorias.routes.js";
import { routerProd } from "./Productos/Productos.routes.js";
import { routerRecover } from "./Recuperar_pass/recover.routes.js";
import { routerUsu } from "./Usuarios/Usuario.routes.js";
import { routerSuc } from "./Sucursales/Sucursales.routes.js";
import { routerCli } from "./Clientes/Cliente.routes.js";
import { routerEmp } from "./Empleado/Empleados.routes.js";
import { routerSupplier } from "./Proveedores/Proveedores.routes.js";
import { routerVenta } from "./Ventas/Ventas.routes.js";
import { routerRenglon } from "./Ventas/Renglon/Renglon.routes.js";
import { login, logout, register } from "./Usuarios/Usuario.controllers.js";
import { authenticate, authorizedRole } from "./authenticate.middleware.js";
import { routerMP } from "./mercadoPago/mercadoPago.routes.js";
import { upload, uploadImg } from "./Imagenes/images.controllers.js";

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