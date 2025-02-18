import express from "express";
import { routerSuc } from "./Sucursales/Sucursales.routes.js";
import { routerProd } from "./Productos/Productos.routes.js";
import { routerUsu } from "./Usuarios/Usuario.routes.js";
import { routerCli } from "./Clientes/Cliente.routes.js";
import { routerSupplier } from "./Proveedores/Proveedores.routes.js";
import { routerEmp } from "./Empleado/Empleados.routes.js";
import { routerVenta } from "./Ventas/Ventas.routes.js";
import { routerRenglon } from "./Ventas/Renglon/Renglon.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import { routerCat } from "./Productos/Categorias/categorias.routes.js";
import {login,logout, register, updateUser} from "./Usuarios/Usuario.controllers.js";
import { getAll, getOne } from "./Productos/Productos.controllers.js";
import { routerMP } from "./mercadoPago/mercadoPago.routes.js";
import morgan from "morgan";
import dotenv from "dotenv";
import { deleteToken, searchAllToken, searchToken, sendEmail } from "./Recuperar_pass/recover.controllers.js";

dotenv.config()


const port = process.env.PORT || 8080;

//Abre servidor con Express
export const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);


// app.use(morgan("dev"))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// middleware de autenticacion de sesion de usuario
 const authenticate = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ message: "No autorizado" });
  try {
    req.user = jwt.verify(token, process.env.SECRET_JWT);
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido" });
  }
};

 const authorizedRole = (role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) return res.status(403).json({ message: "No autorizado" });
    next();
  };
};


app.use("/Branches", /*authenticate, authorizedRole([1]),*/ routerSuc);
app.use("/Clients", /*authenticate, authorizedRole([1, 2]),*/ routerCli);
app.use("/Products", /*authenticate, authorizedRole([1, 2]),*/routerProd);
app.use("/Employees",/* authenticate, authorizedRole([1]),*/ routerEmp);
app.use("/users",/* authenticate, authorizedRole([1]),*/routerUsu);
app.use("/Suppliers",/* authenticate, authorizedRole([1, 2]),*/ routerSupplier);
app.use("/Sales",/* authenticate, authorizedRole([1, 2]),*/ routerVenta);
app.use("/Rows",/* authenticate, authorizedRole([1, 2]),*/ routerRenglon);
app.use("/category",/* authenticate, authorizedRole([1, 2]),*/ routerCat);
app.use("/mp",routerMP); 

app.get("/authorized", authenticate, (req, res) => {
  res.status(200).json(req.user);
});
app.get("/", (req, res) => {res.status(200).json("API Pintureria")} )
app.get("/Products", getAll);
app.get("/Products/:id", getOne);
app.post("/register", register);
app.post("/login", login);
app.post("/logout", logout);
app.post("/recover", sendEmail);
app.get("/recover", searchAllToken);
app.get("/recover/:token", searchToken);
app.delete("/recover/:token",deleteToken );
app.patch("/users", updateUser);

app.use((_, res) => {
  return res.status(404).json({ message: "Pagina no encontrada" });
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
