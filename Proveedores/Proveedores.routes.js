import { Router } from 'express';
import { add, getAll, getOne, remove, update } from './Proveedores.controllers.js';
import { authenticate, authorizedRole } from '../authenticate.middleware.js';

export const routerSupplier = Router();

routerSupplier.use(authenticate)
routerSupplier.use(authorizedRole([1, 2]))

routerSupplier.get('/', getAll);
routerSupplier.get('/:id', getOne);
routerSupplier.post('/', add);
routerSupplier.patch('/:id', update);
routerSupplier.delete('/:id', remove);
