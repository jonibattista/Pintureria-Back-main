import { Router } from "express";
import { createOrder, getPayment, webhook } from "../../controllers/mercadoPago.controllers.js";

export const routerMP = Router()



routerMP.get("/:id", getPayment)
routerMP.post("/", createOrder)
routerMP.post("/webhook", webhook)



