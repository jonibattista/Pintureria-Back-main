import { Router } from 'express';
import { add, getAll, getOne, remove, update } from './Usuario.controllers.js';

export const routerUsu = Router();

routerUsu.get('/', getAll);
routerUsu.get('/:id', getOne);
routerUsu.post('/', add);
routerUsu.put('/:id', update);
routerUsu.delete('/:id', remove);
