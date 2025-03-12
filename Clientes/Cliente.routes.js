import { Router } from 'express';
import { add, getAll, getByDNI, remove, update } from './Cliente.controllers.js';
import { authenticate, authorizedRole } from '../authenticate.middleware.js';


// Rutas para la tabla Client
export const routerCli = Router();

routerCli.use(authenticate)
routerCli.use(authorizedRole([1, 2]))

routerCli.get('/', getAll);
routerCli.get('/:id', getByDNI);
routerCli.post('/', add);
routerCli.patch('/:id', update);
routerCli.delete('/:id', remove);
