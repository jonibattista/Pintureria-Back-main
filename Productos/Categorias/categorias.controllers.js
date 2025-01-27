import { Category } from "./categorias.class.js";



export const getAll = async (req, res) => {
    Category.sync()
    try {
        const result = await Category.findAll();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

// export const getOne = async (req, res) => {
//     Product.sync()
//     const id = req.params.id;
//     try {
//         const result = await Product.findOne({ where: { id: id } });
//         res.status(200).json(result);
//     } catch (error) {
//         res.status(500);
//     }
// };

export const add = async (req, res) => {
    Category.sync()
    const category = req.body;
    try {
        const result = await Category.bulkCreate(category);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error al agregar categorias." });
    }
};

// export const update = async (req, res) => {
//     Product.sync()
//     const { id } = req.params;
//     const { description, price, stock, idProv } = req.body;
//     try {
//         const result = await Product.update({ description: description, price: price, stock: stock, idProv: idProv }, { where: { id: id } });
//         res.status(200).json(result);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// };

// export const remove = async (req, res) => {
//     Product.sync()
//     const { id } = req.params;
//     try {
//         const result = await Product.destroy({ where: { id: id } });
//         res
//             .status(200)
//             .send({ message: `Sucursal número ${id} eliminada con exito`, result });
//     } catch (error) {
//         res.status(500);
//     }
// };
