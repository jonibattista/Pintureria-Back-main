import { Router } from 'express';
import { add, getAll, getOne, remove, update } from './Empleados.controllers.js';
import { authenticate, authorizedRole } from '../authenticate.middleware.js';

export const routerEmp = Router();

routerEmp.use(authenticate)
routerEmp.use(authorizedRole([1]))

routerEmp.get('/', getAll);
routerEmp.get('/:id', getOne);
routerEmp.post('/', add);
routerEmp.patch('/:id', update);
routerEmp.delete('/:id', remove);
