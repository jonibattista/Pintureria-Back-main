import { Router } from 'express';
import { add, getAll, getByCat, getByTitle, getOne, remove, update } from './Productos.controllers.js';
import { authenticate, authorizedRole } from '../authenticate.middleware.js';
import { validateNewProduct, validateUpdateProduct } from '../middlewares/validations/product.js';

export const routerProd = Router();

routerProd.get("/:id", getOne);
routerProd.get("/:idCat", getByCat);
routerProd.get("/:title", getByTitle);
routerProd.get("/", getAll);

routerProd.use(authenticate)
routerProd.use(authorizedRole([1, 2]))

routerProd.post('/', add);
routerProd.patch('/:id',validateNewProduct, update);
routerProd.delete('/:id', validateUpdateProduct,remove);
