import { Router } from 'express';
import { authenticate, authorizedRole } from '../../middlewares/authenticate.middleware.js';
import { validateNewProduct, validateUpdateProduct } from '../../middlewares/validations/product.js';
import { add, getAll, getOne, getByCat, getByTitle, remove, update } from '../../controllers/Productos.controllers.js';

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
