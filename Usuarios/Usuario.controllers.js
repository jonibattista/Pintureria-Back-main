
import { User } from './Usuario.class.js';
import { Client } from '../Clientes/Cliente.class.js';
import bcrypt from 'bcrypt';


export const getAll = async (req, res) => {
  await User.sync()
  try {
    const result = await User.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getByLevel = async (req, res) => {
  await User.sync()

  const level = req.params.level;
  try {
    const result = await User.findAll({ where: { level: level } });
    res.status(200).json(result);
  } catch (error) {
    res.status(500);
  }
};

export const getByUserName = async (req, res) => {
  await User.sync()
  const { userName } = req.params;
  console.log(userName)
  try {
    const result = await User.findOne({ where: { userName: userName } });
    res.status(200).json(result);
  } catch (error) {
    res.status(500);
  }
};

export const getByUserEmail = async (req, res) => {
  await User.sync()
  const { email } = req.params;
  try {
    const result = await User.findOne({ where: { email: email } });
    res.status(200).json(result);
  } catch (error) {
    res.status(500);
  }
};

export const login = async (req, res) => {
  await User.sync()

  const { userName, pswHash } = req.body;

  try {
    const user = await User.findOne({ where: { userName: userName } });
    console.log(user)

    if (!user) {

      return res.status(400).json(user);
    }
    const esCorrecta = await bcrypt.compare(pswHash, user.pswHash);
    if (!esCorrecta) {
      return res.status(401).json(undefined);
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500);
  }
};

export const add = async (req, res) => {
  await User.sync()

  const { userName, email, pswHash, level } = req.body;
  const hash = await bcrypt.hash(pswHash, 10);
  try {
    const result = await User.create({ userName: userName, email: email, pswHash: hash, level: level });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const update = async (req, res) => {
  await User.sync()

  const { id } = req.params;
  const { userName, pswHash, level } = req.body;
  try {
    const result = await User.update({ userName: userName, pswHash: pswHash, level: level }, { where: { id: id } });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const remove = async (req, res) => {
  await User.sync()

  const { id } = req.params;
  try {
    const result = await User.destroy({ where: { id: id } });
    res
      .status(200)
      .send({ message: `Usuario id: ${id} eliminado con exito`, result });
  } catch (error) {
    res.status(500);
  }
};
