import { body } from 'express-validator';
import { validateData } from './validationData.helper';
import { Branch } from '../../Sucursales/Sucursal.class';

const findAddress = async (value,excludId = null) => {
  const whereClause = { address: value };
  if(excludId)whereClause.id = { [Op.not] : excludId };
  const branch = await Branch.findOne({where: whereClause});
  if(branch){
    throw new Error('address already exists');
  }}

export const validateNewBranch = [
    body('address')
      .exists({checkFalsy:true}).not().isEmpty().withMessage('address should not be empty')
      .isString().withMessage('address should be a string')
      .bail()
      .custom(findAddress),
    body('phone')
      .exists({checkFalsy:true}).not().isEmpty().withMessage('phone should not be empty')
      .isInt().withMessage('phone should be a string'),
    validateData
];
  
export const validateUpdateBranch = [
    body('address')
      .optional().isString().withMessage('address should be a string')
      .bail()
      .custom(findAddress, req.params.id),
    body('phone').optional().isInt().withMessage('phone sould be a string'),
    validateData
];