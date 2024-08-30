import { Usuario } from './Usuario.class.js';

export const getAll = async (req, res) => {
  try {
    const result = await Usuario.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getOne = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Usuario.findOne(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500);
  }
};

export const add = async (req, res) => {
  const { uname, uemail, psw } = req.body;
  try {
    const result = await Usuario.add(uname, uemail, psw);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { username, email, psw } = req.body;
  try {
    const result = await Usuario.update(id, username, email, psw);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Usuario.delete(id);
    res
      .status(200)
      .send({ message: `Sucursal número ${id} eliminada con exito`, result });
  } catch (error) {
    res.status(500);
  }
};
