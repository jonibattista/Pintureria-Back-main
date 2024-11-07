import { Level } from "./userLevel.class.js";

export const getAll = async (req, res) => {
    await Level.sync({ alter: true })
    try {
        const result = await Level.findAll();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getByID = async (req, res) => {
    await Level.sync({ alter: true })

    const id = req.params.id;
    try {
        const result = await Level.findAll({ where: { id: id } });
        res.status(200).json(result);
    } catch (error) {
        res.status(500);
    }
};

export const add = async (req, res) => {
    await Level.sync({ alter: true })

    const { description } = req.body;
    try {
        const result = await Level.create({ description: description });
        res.status(201).json(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const update = async (req, res) => {
    await Level.sync({ alter: true })

    const { id } = req.params;
    const { description } = req.body;
    try {
        const result = await Level.update({ description: description }, { where: { id: id } });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const remove = async (req, res) => {
    await Level.sync({ alter: true })

    const { id } = req.params;
    try {
        const result = await Level.destroy({ where: { id: id } });
        res
            .status(200)
            .send({ message: `Nivel id: ${id} eliminado con exito`, result });
    } catch (error) {
        res.status(500);
    }
};