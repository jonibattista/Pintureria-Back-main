import { Router } from 'express';
import { add, getAll, getByID, remove, update } from './userLevel.controller.js';

export const routerLevel = Router();

routerLevel.get('/', getAll);
routerLevel.get('/:id', getByID);
routerLevel.post('/', add);
routerLevel.put('/:id', update);
routerLevel.delete('/:id', remove);
