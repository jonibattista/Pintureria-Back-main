import { Router } from 'express';
import { add, getAll, getByDNI, remove, update } from '../../controllers/Cliente.controllers.js';
import { authenticate, authorizedRole } from '../../middlewares/authenticate.middleware.js';
import { validateNewClient, validateUpdateClient } from '../../middlewares/validations/client.js';


// Rutas para la tabla Client
export const routerCli = Router();

routerCli.use(authenticate)
routerCli.use(authorizedRole([1, 2]))

routerCli.get('/', getAll);
routerCli.get('/:id', getByDNI);
routerCli.post('/', validateNewClient ,add);
routerCli.patch('/:id',validateUpdateClient ,update);
routerCli.delete('/:id', remove);
