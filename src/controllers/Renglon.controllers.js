import { Row } from "../models/Renglon.model.js";


export const getAll = async (req, res) => {
    Row.sync()
    try {
        const result = await Row.findAll();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message:"error al obtener las filas"});
    }
};

export const getBySale = async (req, res) => {
    Row.sync({alter:true})
    const id = req.params.id;
    try {
        const result = await Row.findAll({ where: { idSale: id } });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message:"error al obtener las filas"});
    }
};

export const add = async (req, res) => {
    Row.sync()
    const { idSale, idProduct, price, quantity, total, title } = req.body;
    try {
        const result = await Row.create({ idSale: idSale, title: title, idProduct: idProduct, price: price, quantity: quantity, total: total });
        res.status(201).json(result);
    } catch (error) {
        res.status(500).send({message:"error al agregar fila"});
    }
};

export const update = async (req, res) => {
    Row.sync()
    const { id } = req.params;
    const { idSale, idProduct, price, quantity, total, title } = req.body;
    try {
        const result = await Row.update({ idProduct: idProduct, price: price, quantity: quantity, total: total,title:title }, { where: { id: id } });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send({message:"error al actualizar fila"});
    }
};

export const remove = async (req, res) => {
    Row.sync()
    const { id } = req.params;
    try {
        const result = await Row.destroy({ where: { id: id } });
        res
            .status(200)
            .send({ message: `renglon número ${id} eliminada con exito`, result });
    } catch (error) {
        res.status(500).send({message:"error al eliminar fila"});;
    }
};
