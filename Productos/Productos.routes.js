import { Router } from 'express';
import { add, getAll, getOne, remove, update } from './Productos.controllers.js';

export const routerProd = Router();

routerProd.get('/', getAll);
routerProd.get('/:id', getOne);
routerProd.post('/', add);
routerProd.patch('/:id', update);
routerProd.delete('/:id', remove);
