import { body } from 'express-validator';
import { validateData } from './validationData.helper';

const commonProductValidation = [
  body('sku').optional().isString().withMessage('SKU should be a string'),
  body('description').optional().isString().withMessage('description should be a string'),
  body('idProv').optional().isInt().withMessage('idProv should be an integer'),
  body('idCat').optional().isInt().withMessage('idCat should be an integer'),
  body('imgUrl').optional().isString().withMessage('imgUrl should be an sting'),
]

export const validateNewProduct = [
  body('title')
    .exists({checkFalsy:true}).not().isEmpty().withMessage('title should not be empty')
    .isString().withMessage('title should be a string'),
  body('price')
    .exists({checkFalsy:true}).not().isEmpty().withMessage('price should not be empty')
    .isFloat().withMessage('price should be a float'),
  body('stock')
    .exists({checkFalsy:true}).not().isEmpty().withMessage('stock should not be empty')
    .isInt().withMessage('stock should be a integer'),
  ...commonProductValidation,
  validateData
];
  
export const validateUpdateProduct = [
  body('title').optional().isString().withMessage('title should be a string'),
  body('price').optional().isFloat().withMessage('price should be a float'),
  body('stock').optional().isInt().withMessage('stock should be a integer'),
  ...commonProductValidation,
  validateData
];