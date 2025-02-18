import { Category } from "./categorias.class.js";



export const getAllCat = async (req, res) => {
    Category.sync()
    try {
        const result = await Category.findAll();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message:"error al obtener las categorias"});
    }
};

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
