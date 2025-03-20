import { Router } from 'express';
import { getAll, getByLevel, createUser, remove, getByUserEmail, getByUserName, updateUser } from './Usuario.controllers.js';
import { authenticate, authorizedRole } from '../authenticate.middleware.js';
import {validateNewUser, validateUpdateUser} from '../middlewares/validations/user.js'

export const routerUsu = Router();

routerUsu.get('/email/:email', getByUserEmail);
routerUsu.get('/name/:userName', getByUserName);
routerUsu.patch('/', validateUpdateUser, updateUser);

routerUsu.use(authenticate)
routerUsu.use(authorizedRole([1]))

routerUsu.get('/', getAll);
routerUsu.get('/role/:role', getByLevel);
routerUsu.post('/', validateNewUser, createUser);
routerUsu.delete('/:id', remove);

