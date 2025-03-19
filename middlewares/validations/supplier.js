import { body } from 'express-validator';
import { validateData } from './validationData.helper';

const commonValidation = [
    body('address').optional().isString().withMessage('address should be a string'),
    body('phone').optional().isInt().withMessage('phone should be an integer'),
]

export const validateNewSupplier = [
    body('cuit')
      .exists({checkFalsy:true}).not().isEmpty().withMessage('CUIT should not be empty')
      .isInt().withMessage('CUIT should be an integer'),
    body('name')
      .exists({checkFalsy:true}).not().isEmpty().withMessage('name should not be empty')
      .isString().withMessage('name should be a string'),
    ...commonValidation,
    validateData
  ];
  
  export const validateUpdateSupplier = [
      body('cuit').optional().isInt().withMessage('DNI should be an integer'),
      body('name').optional().isString().withMessage('name sould be a string'),
      ...commonValidation,
      validateData
    ];