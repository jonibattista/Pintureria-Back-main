import { Router } from 'express';
import { add, getAll, remove, update } from './Renglon.controllers.js';

export const routerRenglon = Router();

routerRenglon.get('/', getAll);
routerRenglon.post('/', add);
routerRenglon.patch('/:id', update);
routerRenglon.delete('/:id', remove);
