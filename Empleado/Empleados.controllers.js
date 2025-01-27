import { Employee } from "./Empleados.class.js";

export const getAll = async (req, res) => {
  Employee.sync({alter:true});
  try {
    const result = await Employee.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los empleados." });
  }
};

export const getOne = async (req, res) => {
  Employee.sync();
  const id = req.params.id;
  try {
    const result = await Employee.findOne({ where: { id: id } });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el empleado." });
  }
};

export const add = async (req, res) => {
  Employee.sync();
  const emp = req.body;
  if (Array.isArray(emp)){
    try {
      const result = await Employee.bulkCreate(emp);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: "Error al agregar empleados." });
    }
  }
  else {
    if (emp.dni) {
      const existingClient = await Employee.findOne({ where: { dni: emp.dni } });
      if (existingClient) {
        return res.status(400).json({ message: "El DNI ya existe." });
      }
    }
    try {
      const { name, phone, dni, salary } = emp;
      const result = await Employee.create({
        name: name,
        phone: phone,
        dni: dni,
        salary: salary,
      });
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: "Error al agregar el empleado." });
    }

  }
};

export const update = async (req, res) => {
  Employee.sync();
  const { id } = req.params;
  const { name, phone, dni, salary } = req.body;
  if (dni) {
    const existingEmp = await Employee.findOne({ where: { dni: dni } });
    if (existingEmp && existingEmp.id !== id) {
      return res.status(400).json({ message: "El DNI ya existe." });
    }
  }
  try {
    const result = await Employee.update(
      { name: name, phone: phone, dni: dni, salary: salary },
      { where: { id: id } }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el empleado." });
  }
};

export const remove = async (req, res) => {
  Employee.sync();
  const { id } = req.params;
  try {
    const result = await Employee.destroy({ where: { id: id } });
    res
      .status(200)
      .send({ message: `empleado número ${id} eliminada con exito`, result });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el empleado." });
  }
};
