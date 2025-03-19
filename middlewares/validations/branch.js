import { body } from 'express-validator';
import { validateData } from './validationData.helper';

export const validateNewBranch = [
    body('address')
      .exists({checkFalsy:true}).not().isEmpty().withMessage('address should not be empty')
      .isString().withMessage('address should be a string'),
    body('phone')
      .exists({checkFalsy:true}).not().isEmpty().withMessage('phone should not be empty')
      .isInt().withMessage('phone should be a string'),
    validateData
];
  
export const validateUpdateBranch = [
    body('address').optional().isInt().withMessage('address should be a string'),
    body('phone').optional().isString().withMessage('phone sould be a string'),
    validateData
];