import { Router } from 'express';
import { add, remove, update } from './Productos.controllers.js';

export const routerProd = Router();

routerProd.post('/', add);
routerProd.patch('/:id', update);
routerProd.delete('/:id', remove);
