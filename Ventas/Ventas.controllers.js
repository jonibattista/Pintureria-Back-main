import { Sale } from "./Ventas.class.js";


export const getAll = async (req, res) => {
    Sale.sync()
    try {
        const result = await Sale.findAll();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las ventas." });
    }
};

export const getOne = async (req, res) => {
    Sale.sync()
    const id = req.params.id;
    try {
        const result = await Sale.findOne({ where: { id: id } });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la venta." });;
    }
};

export const add = async (req, res) => {
    Sale.sync()
    const { idClient, idEmp, idBranch, total } = req.body;
    try {
        const result = await Sale.create({ idClient: idClient, idEmp: idEmp, idBranch: idBranch, total: total });
        res.status(201).json(result.id);
    } catch (error) {
        res.status(500).json({ message: "Error al agregar venta." });
    }
};

export const update = async (req, res) => {
    Sale.sync()
    const { id } = req.params;
    const { idClient, idEmp, idBranch, total } = req.body;
    try {
        const result = await Sale.update({ idClient: idClient, idEmp: idEmp, idBranch: idBranch, total: total }, { where: { id: id } });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar venta." });
    }
};

export const remove = async (req, res) => {
    Sale.sync()
    const { id } = req.params;
    try {
        const result = await Sale.destroy({ where: { id: id } });
        res
            .status(200)
            .send({ message: `Venta número ${id} eliminada con exito`, result });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar las venta." });;
    }
};
