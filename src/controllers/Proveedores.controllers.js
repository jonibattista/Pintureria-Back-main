import { Supplier } from "../models/Proveedores.model.js";


export const getAll = async (req, res) => {
    Supplier.sync()
    try {
        const result = await Supplier.findAll();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message: "Error al obtener los proveedores"});
    }
};

export const getOne = async (req, res) => {
    Supplier.sync()
    const id = req.params.id;
    try {
        const result = await Supplier.findOne({ where: { id: id } });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message: "Error al obtener los proveedores"});
    }
};

export const add = async (req, res) => {
    Supplier.sync()
    const { cuit, name, address, phone } = req.body;
         try {
             const result = await Supplier.create({ cuit: cuit, name: name, address: address, phone: phone });
             res.status(201).json(result);
         } catch (error) {
             res.status(500).json({message: "Error al agregar el proveedor"});
         }

};

export const update = async (req, res) => {
    Supplier.sync()
    const { id } = req.params;
    const { cuit, name, address, phone } = req.body;
    try {
        const result = await Supplier.update({ cuit: cuit, name: name, address: address, phone: phone }, { where: { id: id } });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message: "Error al actualizar el proveedor"});
    }
};

export const remove = async (req, res) => {
    Supplier.sync()
    const { id } = req.params;
    try {
        const result = await Supplier.destroy({ where: { id: id } });
        res
            .status(200)
            .send({ message: `Proveedor número ${id} eliminada con exito`, result });
    } catch (error) {
        res.status(500).json({message: "Error al eliminar el proveedor"});;
    }
};
