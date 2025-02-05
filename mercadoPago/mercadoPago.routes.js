import { Router } from "express";
import { createOrder, getOrder } from "./mercadoPago.controllers.js";

export const routerMP = Router()


routerMP.get("/", getOrder)

routerMP.post("/", createOrder)



