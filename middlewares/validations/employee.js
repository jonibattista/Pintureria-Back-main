import { body } from 'express-validator';
import { validateData } from './validationData.helper';

export const validateNewEmployee = [
  body('dni')
    .exists({checkFalsy:true}).not().isEmpty().withMessage('DNI should not be empty')
    .isInt().withMessage('DNI should be an integer'),
  body('name')
    .exists({checkFalsy:true}).not().isEmpty().withMessage('name should not be empty')
    .isString().withMessage('name should be a string'),
  body('salary')
    .exists({checkFalsy:true}).not().isEmpty().withMessage('salary should not be empty')
    .isFloat().withMessage('salary should be a float'),
  body('phone').optional().isInt().withMessage('phone should be an integer'),
  validateData
];
  
export const validateUpdateEmployee = [
  body('dni').optional().isInt().withMessage('DNI should be an integer'),
  body('name').optional().isString().withMessage('name should be a string'),
  body('salary').optional().isFloat().withMessage('salary should be a float'),
  body('phone').optional().isInt().withMessage('phone should be an integer'),
  validateData
];
