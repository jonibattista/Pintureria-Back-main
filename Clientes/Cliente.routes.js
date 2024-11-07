import { Router } from 'express';
import { add, getAll, getByDNI, remove, update } from './Cliente.controllers.js';

export const routerCli = Router();

routerCli.get('/', getAll);
routerCli.get('/:id', getByDNI);
routerCli.post('/', add);
routerCli.patch('/:id', update);
routerCli.delete('/:id', remove);
