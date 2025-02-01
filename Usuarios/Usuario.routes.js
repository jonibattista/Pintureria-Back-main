import { Router } from 'express';
import { getAll, getByLevel, getByUserEmail, getByUserName, remove, update } from './Usuario.controllers.js';

export const routerUsu = Router();

routerUsu.get('/', getAll);
routerUsu.get('/name/:userName', getByUserName);
routerUsu.get('/role/:role',  getByLevel);
routerUsu.put('/:id', update);
routerUsu.delete('/:id', remove);
routerUsu.get('/email/:email', getByUserEmail);

