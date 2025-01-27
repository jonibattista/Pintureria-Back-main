import { Branch } from "./Sucursal.class.js";

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
  const branches = req.body;
  if (Array.isArray(branches)){
    try {
      const result = await Branch.bulkCreate(branches);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: "Error al agregar sucursales." });
    }
    
  }else{
    if (branches.address) {
      const existingBrach = await Branch.findOne({ where: { address: branches.address } });
      if (existingBrach) {
        return res.status(400).json({ message: "Direccion ya existe." });
      }
    }
    try {
      const {address,phone} = branches
      const result = await Branch.create({ address: address, phone: phone });
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({message: "Error al agregar sucursal"});
    }

  }
};

export const update = async (req, res) => {
  await Branch.sync();
  const { id } = req.params;
  const { address, phone } = req.body;
  if (address) {
    const existingBrach = await Branch.findOne({ where: { address: address } });
    if (existingBrach && existingBrach.id !== id) {
      return res.status(400).json({ message: "Direccion ya existe." });
    }
  }
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
    res.status(500).json({message: "Error al eliminar sucursal"});
  }
};
