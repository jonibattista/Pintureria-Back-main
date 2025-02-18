import { Router } from 'express';
import {add } from './categorias.controllers.js';


export const routerCat = Router();

routerCat.post('/', add);
