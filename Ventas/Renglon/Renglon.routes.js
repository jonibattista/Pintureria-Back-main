import { Router } from 'express';
import { add, getAll, getBySale, remove, update } from './Renglon.controllers.js';
import { authenticate } from '../../authenticate.middleware.js';

export const routerRenglon = Router();

routerRenglon.use(authenticate)

routerRenglon.get("/:id" ,getBySale);

routerRenglon.use(authorizedRole([1, 2]))

routerRenglon.get('/', getAll);
routerRenglon.post('/', add);
routerRenglon.patch('/:id', update);
routerRenglon.delete('/:id', remove);
