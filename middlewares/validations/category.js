import { body } from 'express-validator';
import { validateData } from './validationData.helper';
import {Category} from '../../Productos/Categorias/categorias.class';
import { Op } from 'sequelize';


const findCat = async (value,excludId = null) => {
  const whereClause = { description: value };
  if(excludId)whereClause.id = { [Op.not] : excludId };
  const cat = await Category.findOne({where: {name: value}});
  if(cat){
    throw new Error('category already exists');
  }}

export const validateNewCat = [
  body('description')
    .exists({checkFalsy:true}).not().isEmpty().withMessage('description should not be empty')
    .isString().withMessage('description should be an integer')
    .bail()
    .custom(findCat),
  body('imgUrl').optional().isString().withMessage('imgUrl should be a string'),
  validateData
];
  
export const validateUpdateCat = [
  body('description')
  .optional().isString().withMessage('description should be an integer')
  .bail()
  .custom(findCat),
  body('imgUrl').optional().isString().withMessage('imgUrl should be a string'),
  validateData
];
