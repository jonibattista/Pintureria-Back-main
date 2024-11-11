import { Router } from 'express';
import { add, getAll, getByLevel, getByUserEmail, getByUserName, login, remove, update } from './Usuario.controllers.js';

export const routerUsu = Router();

routerUsu.get('/', getAll);
routerUsu.get('/name/:userName', getByUserName);
routerUsu.get('/level/:level', getByLevel);
routerUsu.post('/login', login);
routerUsu.post('/', add);
routerUsu.put('/:id', update);
routerUsu.delete('/:id', remove);
routerUsu.get('/email/:email', getByUserEmail);

