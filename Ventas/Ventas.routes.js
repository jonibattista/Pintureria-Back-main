import { Router } from 'express';
import { addSale, getAll, getByUserId, getOne, remove, update } from './Ventas.controllers.js';
import { authenticate, authorizedRole } from '../authenticate.middleware.js';
import { validateNewSale } from '../middlewares/validations/sale.js';

export const routerVenta = Router();

routerVenta.use(authenticate)

routerVenta.post("/", validateNewSale,addSale)
routerVenta.get("/:idUser",getByUserId)


routerVenta.use(authorizedRole([1,2]))

routerVenta.get('/', getAll);
routerVenta.get('/:id', getOne);
routerVenta.patch('/:id', update);
routerVenta.delete('/:id', remove);
