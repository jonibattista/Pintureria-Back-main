import { Router } from 'express';
import { add, getAll, getOne, remove, update } from './Empleados.controllers.js';

export const routerEmp = Router();

routerEmp.get('/', getAll);
routerEmp.get('/:id', getOne);
routerEmp.post('/', add);
routerEmp.patch('/:id', update);
routerEmp.delete('/:id', remove);
