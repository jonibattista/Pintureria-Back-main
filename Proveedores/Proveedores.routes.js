import { Router } from 'express';
import { add, getAll, getOne, remove, update } from './Proveedores.controllers.js';
import { authenticate, authorizedRole } from '../authenticate.middleware.js';
import {validateNewSupplier, validateUpdateSupplier} from '../middlewares/validations/supplier.js';

export const routerSupplier = Router();

routerSupplier.use(authenticate)
routerSupplier.use(authorizedRole([1, 2]))

routerSupplier.get('/', getAll);
routerSupplier.get('/:id', getOne);
routerSupplier.post('/', validateNewSupplier, add);
routerSupplier.patch('/:id',validateUpdateSupplier ,update);
routerSupplier.delete('/:id', remove);
