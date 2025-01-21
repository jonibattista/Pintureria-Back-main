import { User } from './Usuario.class.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import { SECRET_JWT } from '../config.js';


export const getAll = async (req, res) => {
  await User.sync({alter:true});
  try {
    const result = await User.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({message: 'Error al obtener los usuarios'});
  }
};

export const getByLevel = async (req, res) => {


  const level = req.params.level;
  try {
    const result = await User.findAll({ where: { level: level } });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({message: 'Error al obtener los usuarios'});
  }
};

export const getByUserName = async (req, res) => {

  const { userName } = req.params;
  console.log(userName)
  try {
    const result = await User.findOne({ where: { userName: userName } });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({message: 'Error al obtener el usuario'});
  }
};

export const getByUserEmail = async (req, res) => {

  const { email } = req.params;
  try {
    const result = await User.findOne({ where: { email: email } });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({message: 'Error al obtener el usuario'});
  }
};

export const login = async (req, res) => {

  const { userName, pswHash } = req.body;
  try {
    const user = await User.findOne({ where: { userName: userName } });
    const token = jwt.sign({ id: user.id, username: user.userName, level: user.level }, SECRET_JWT, { expiresIn: "1h" })
    
    if (!user) {
      return res.status(400).json(user);
    }
    const esCorrecta = await bcrypt.compare(pswHash, user.pswHash);
    if (!esCorrecta) {
      return res.status(401).send(undefined);
    }
    return res.status(200)
       .cookie("access_token", token, {
         httpOnly: true,
         maxAge: 1000 * 60 * 60,
         secure: false, 
         sameSite: 'lax', 
       }).json(user.level)
      //  .send({token:token});
  } catch (error) {
    res.status(401).json({message: 'Error en el inicio de sesión'});
  }
};

export const logout =  (req, res) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json({ message: 'Logout exitoso' });    
  } catch (error) {
    res.status(500).json({message: "Error al cerrar sesion"})
  }
  
};

export const register = async (req, res) => {

  const { userName, email, pswHash, level } = req.body;
  const userExist = await User.findOne({ where: { userName: userName } });
  if (userExist) return res.status(400).json({message: 'Nombre de usuario existente'});
  const emialExist = await User.findOne({ where: { email: email } });
  if (emialExist) return res.status(400).json({message: 'email existente'});
  const hash = await bcrypt.hash(pswHash, 10);
  try {
    const result = await User.create({ userName: userName, email: email, pswHash: hash, level: level });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({message: 'Error al ingresar el usuario'});
  }
};

export const update = async (req, res) => {

  const { id } = req.params;
  const { userName, pswHash, level } = req.body;
  if (dni) {
      const existingUser = await User.findOne({ where: { userName: userName } });
      if (existingUser && existingUser.id !== id) {
        return res.status(400).json({ message: "El nombre de usuario ya existe." });
      }
    }
  try {
    const result = await User.update({ userName: userName, pswHash: pswHash, level: level }, { where: { id: id } });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({message: 'Error al actualizar el usuario'});
  }
};

export const remove = async (req, res) => {

  const { id } = req.params;
  try {
    const result = await User.destroy({ where: { id: id } });
    res
      .status(200)
      .send({ message: `Usuario id: ${id} eliminado con exito`, result });
  } catch (error) {
    res.status(500).json({message: 'Error al eliminar el usuario'});
  }
};
