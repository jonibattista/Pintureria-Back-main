import { Sucursal } from './Sucursal.class.js';

export const getAll = async (req, res) => {
  try {
    const result = await Sucursal.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getOne = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Sucursal.findOne(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500);
  }
};

export const add = async (req, res) => {
  const { direccion, telefono } = req.body;
  try {
    const result = await Sucursal.add(direccion, telefono);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { direccion, telefono } = req.body;
  try {
    const result = await Sucursal.update(id, direccion, telefono);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Sucursal.delete(id);
    res
      .status(200)
      .send({ message: `Sucursal número ${id} eliminada con exito`, result });
  } catch (error) {
    res.status(500);
  }
};
