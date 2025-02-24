import { Router } from 'express';
import {getByUserEmail, getByUserName, updateUser } from './Usuario.controllers.js';

export const publicRouterUser = Router();

publicRouterUser.get('/name/:userName', getByUserName);
publicRouterUser.patch('/',  updateUser);
publicRouterUser.get('/email/:email', getByUserEmail);

