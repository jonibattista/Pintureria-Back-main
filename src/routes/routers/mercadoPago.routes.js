import { Router } from "express";
import { createOrder, failure, getOrder, pending, success, webhook } from "../../controllers/mercadoPago.controllers";

export const routerMP = Router()


routerMP.get("/", getOrder)
routerMP.get("/success", success)
routerMP.get("/failure", failure)
routerMP.get("/pending", pending)

routerMP.post("/", createOrder)
routerMP.post("/webhook", webhook)



