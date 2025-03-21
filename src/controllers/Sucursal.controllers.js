import { Branch } from "../models/Sucursal.model.js";

export const getAll = async (req, res) => {
  await Branch.sync();
  try {
    const result = await Branch.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({message: "Error al obtener las sucursales."});
  }
};

export const getOne = async (req, res) => {
  await Branch.sync();
  const id = req.params.id;
  try {
    const result = await Branch.findOne({ where: { id: id } });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({message: "Error al obtener las sucursal."});
  }
};

export const add = async (req, res) => {
  await Branch.sync();
  const {address,phone} = req.body;
    try {
      const result = await Branch.create({ address: address, phone: phone });
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({message: "Error al agregar sucursal"});
    }
};

export const update = async (req, res) => {
  await Branch.sync();
  const { id } = req.params;
  const { address, phone } = req.body;
  try {
    const result = await Branch.update(
      { address: address, phone: phone },
      { where: { id: id } }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({message: "Error al actualizar sucursal"});
  }
};

export const remove = async (req, res) => {
  await Branch.sync();
  const { id } = req.params;
  try {
    const result = await Branch.destroy({ where: { id: id } });
    res
      .status(200)
      .send({ message: `Sucursal número ${id} eliminada con exito` });
  } catch (error) {
    res.status(500).json({message: "Error al eliminar sucursal", error});
  }
};
