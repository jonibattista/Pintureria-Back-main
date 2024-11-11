import { Employee } from "./Empleados.class.js";


export const getAll = async (req, res) => {
    Employee.sync()
    try {
        const result = await Employee.findAll();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getOne = async (req, res) => {
    Employee.sync()
    const id = req.params.id;
    try {
        const result = await Employee.findOne({ where: { id: id } });
        res.status(200).json(result);
    } catch (error) {
        res.status(500);
    }
};

export const add = async (req, res) => {
    Employee.sync()
    const { name, phone, dni, salary } = req.body;
    try {
        const result = await Employee.create({ name: name, phone: phone, dni: dni, salary: salary });
        res.status(201).json(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const update = async (req, res) => {
    Employee.sync()
    const { id } = req.params;
    const { name, phone, dni, salary } = req.body;
    try {
        const result = await Employee.update({ name: name, phone: phone, dni: dni, salary: salary }, { where: { id: id } });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const remove = async (req, res) => {
    Employee.sync()
    const { id } = req.params;
    try {
        const result = await Employee.destroy({ where: { id: id } });
        res
            .status(200)
            .send({ message: `empleado número ${id} eliminada con exito`, result });
    } catch (error) {
        res.status(500);
    }
};
