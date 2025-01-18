import { Client } from "./Cliente.class.js";

export const getAll = async (req, res) => {
  await Client.sync();
  try {
    const result = await Client.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getByDNI = async (req, res) => {
  await Client.sync();

  const dni = req.params.dni;
  try {
    const result = await Client.findAll({ where: { dni: dni } });
    res.status(200).json(result);
  } catch (error) {
    res.status(500);
  }
};

export const add = async (req, res) => {
  await Client.sync();
  const { dni, name, address, phone } = req.body;
  if (dni) {
    const existingClient = await Client.findOne({ where: { dni: dni } });
    if (existingClient) {
      return res.status(400).json({ message: "El DNI ya existe." });
    }
  }
  try {
    const result = await Client.create({
      dni: dni,
      name: name,
      address: address,
      phone: phone,
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const update = async (req, res) => {
  await Client.sync();

  const { id } = req.params;
  const { dni, name, address, phone } = req.body;
  if (dni) {
    const existingClient = await Branch.findOne({ where: { dni: dni } });
    if (existingClient && existingClient.id !== id) {
      return res.status(400).json({ message: "El DNI ya existe." });
    }
  }
  try {
    const result = await Client.update(
      { address: address, phone: phone, name: name, dni: dni },
      { where: { id: id } }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const remove = async (req, res) => {
  await Client.sync();

  const { id } = req.params;
  try {
    const result = await Client.destroy({ where: { id: id } });
    res
      .status(200)
      .send({ message: `Cliente id: ${id} eliminado con exito`, result });
  } catch (error) {
    res.status(500);
  }
};
