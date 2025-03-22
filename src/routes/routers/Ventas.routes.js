import { Router } from 'express';
import { addSale, getAll, getByUserId, getOne, remove, update } from '../../controllers/Ventas.controllers.js';
import { authenticate, authorizedRole } from '../../middlewares/authenticate.middleware.js';
import { validateNewSale } from '../../middlewares/validations/sale.js';

export const routerVenta = Router();

// routerVenta.use(authenticate)

routerVenta.post("/", validateNewSale,addSale)
routerVenta.get("/:idUser",getByUserId)


// routerVenta.use(authorizedRole([1,2]))

routerVenta.get('/', getAll);
routerVenta.get('/:id', getOne);
routerVenta.patch('/:id', update);
routerVenta.delete('/:id', remove);
