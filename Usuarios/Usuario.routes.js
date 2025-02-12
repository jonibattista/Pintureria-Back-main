import { Router } from 'express';
import { getAll, getByLevel, getByUserEmail, getByUserName, remove } from './Usuario.controllers.js';

export const routerUsu = Router();

routerUsu.get('/', getAll);
routerUsu.get('/name/:userName', getByUserName);
routerUsu.get('/role/:role',  getByLevel);
routerUsu.delete('/:id', remove);
routerUsu.get('/email/:email', getByUserEmail);

