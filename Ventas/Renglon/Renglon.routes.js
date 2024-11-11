import { Router } from 'express';
import { add, getAll, getBySale, remove, removeBySale, update } from './Renglon.controllers.js';

export const routerRenglon = Router();

routerRenglon.get('/', getAll);
routerRenglon.get('/:id', getBySale);
routerRenglon.post('/', add);
routerRenglon.patch('/:id', update);
routerRenglon.delete('/:id', remove);
routerRenglon.delete('/sale/:id', removeBySale);
