import { Router } from "express";
import { deleteToken, searchAllToken, searchToken, sendEmail } from "./recover.controllers";

export const routerRecover = Router()

routerRecover.get("/", searchAllToken);
routerRecover.get("/:token", searchToken);
routerRecover.post("/", sendEmail);
routerRecover.delete("/:token", deleteToken);