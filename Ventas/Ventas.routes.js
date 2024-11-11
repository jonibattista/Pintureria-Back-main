import { Router } from 'express';
import { add, getAll, getOne, remove, update } from './Ventas.controllers.js';

export const routerVenta = Router();

routerVenta.get('/', getAll);
routerVenta.get('/:id', getOne);
routerVenta.post('/', add);
routerVenta.patch('/:id', update);
routerVenta.delete('/:id', remove);