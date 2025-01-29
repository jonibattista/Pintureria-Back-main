import { Row } from "./Renglon.class.js";


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
    Row.sync()
    const id = req.params.id;
    try {
        const result = await Row.findAll({ where: { idSale: id } });
        res.status(200).json(result);
    } catch (error) {
        res.status(500);
    }
};

export const add = async (req, res) => {
    Row.sync()
    const { idSale, idProduct, price, amount, total, description } = req.body;
    try {
        const result = await Row.create({ idSale: idSale, description: description, idProduct: idProduct, price: price, amount: amount, total: total });
        res.status(201).json(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const update = async (req, res) => {
    Row.sync()
    const { id } = req.params;
    const { idSale, idProduct, price, amount, total, description } = req.body;
    try {
        const result = await Row.update({ idProduct: idProduct, price: price, amount: amount, total: total }, { where: { id: id } });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error);
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
        res.status(500);
    }
};
