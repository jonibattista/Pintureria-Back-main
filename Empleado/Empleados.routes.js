import { Router } from 'express';
import { add, getAll, getOne, remove, update } from './Empleados.controllers.js';
import { authenticate, authorizedRole } from '../authenticate.middleware.js';
import { validateNewEmployee, validateUpdateEmployee } from '../middlewares/validations/employee.js';

export const routerEmp = Router();

routerEmp.use(authenticate)
routerEmp.use(authorizedRole([1]))

routerEmp.get('/', getAll);
routerEmp.get('/:id', getOne);
routerEmp.post('/', validateNewEmployee, add);
routerEmp.patch('/:id',validateUpdateEmployee, update);
routerEmp.delete('/:id', remove);
