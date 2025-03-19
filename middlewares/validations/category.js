import { body } from 'express-validator';
import { validateData } from './validationData.helper';

export const validateNewEmployee = [
  body('description')
    .exists({checkFalsy:true}).not().isEmpty().withMessage('description should not be empty')
    .isString().withMessage('description should be an integer'),
  body('imgUrl').optional().isString().withMessage('img should be a string'),
  validateData
];
  
export const validateUpdateEmployee = [
  body('description').optional().isString().withMessage('description should be an integer'),
  body('imgUrl').optional().isString().withMessage('img should be a string'),
  validateData
];
