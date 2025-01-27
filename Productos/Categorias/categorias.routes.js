import { Router } from 'express';
import {add, getAll } from './categorias.controllers.js';


export const routerCat = Router();

routerCat.get('/', getAll);
// routerCat.get('/:id', getOne);
routerCat.post('/', add);
// routerCat.patch('/:id', update);
// routerCat.delete('/:id', remove);
