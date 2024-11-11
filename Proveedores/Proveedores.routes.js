import { Router } from 'express';
import { add, getAll, getOne, remove, update } from './Proveedores.controllers.js';

export const routerSupplier = Router();

routerSupplier.get('/', getAll);
routerSupplier.get('/:id', getOne);
routerSupplier.post('/', add);
routerSupplier.patch('/:id', update);
routerSupplier.delete('/:id', remove);
