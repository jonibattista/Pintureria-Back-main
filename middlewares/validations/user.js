import { body } from 'express-validator';
import { validateData } from './validationData.helper';
import { User } from '../../Usuarios/Usuario.class';

const validatePassword = (password) =>{
    const UpperCase = /[A-Z]/.test(password);
    const LowerCase = /[a-z]/.test(password);
    const Number = /\d/.test(password);
    const MinimumLength = password.length >= 6;

    return UpperCase && LowerCase && Number && MinimumLength;
}

export const validateNewUser = [
    body('userName')
      .exists({checkFalsy:true}).not().isEmpty().withMessage('username should not be empty')
      .isString().withMessage('address should be a string')
      .custom(async(value) => {
        const user = await User.findOne({where: {userName: value}});
        if(user){
          throw new Error('username already exists');
        }
      }),
    body('pswHash')
      .exists({checkFalsy:true}).not().isEmpty().withMessage('password should not be empty')
      .isString().withMessage('password should be a string')
      .custom((value)=>{
        if(!validatePassword(value)){
          throw new Error('password should have at least 6 characters, one uppercase, one lowercase and one number');
        }
      }),
    body('email')
      .exists({checkFalsy:true}).not().isEmpty().withMessage('email should not be empty')
      .isEmail().withMessage('email should be an email')
      .custom(async(value) => {
        const user = await User.findOne({where: {email: value}});
        if(user) throw new Error('email already exists');
       }),
    body('role')
      .exists({checkFalsy:true}).not().isEmpty().withMessage('role should not be empty')
      .isInt().withMessage('role should be a string'),
    validateData
];
  
export const validateUpdateUser = [
    body('userName')
      .optional()
      .isString().withMessage('address should be a string')
      .custom(async(value) => {
        const user = await User.findOne({where: {userName: value}});
        if(user){
          throw new Error('username already exists');
        }
      }),
    body('pswHash')
      .optional()
      .isString().withMessage('password should be a string')
      .custom((value)=>{
        if(!validatePassword(value)){
          throw new Error('password should have at least 6 characters, one uppercase, one lowercase and one number');
        }
      }),
    body('email')
      .optional()
      .isEmail().withMessage('email should be an email')
      .custom(async(value) => {
        const user = await User.findOne({where: {email: value}});
        if(user) throw new Error('email already exists');
       }),
    body('role')
      .exists({checkFalsy:true}).not().isEmpty().withMessage('role should not be empty')
      .isInt().withMessage('role should be a string'),
    validateData
];