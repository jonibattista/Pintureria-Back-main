import { Router } from 'express';
import { getAll, getByLevel, createUser, remove } from './Usuario.controllers.js';

export const routerUsu = Router();

routerUsu.get('/', getAll);
routerUsu.get('/role/:role',  getByLevel);
routerUsu.post('/',  createUser);
routerUsu.delete('/:id', remove);

