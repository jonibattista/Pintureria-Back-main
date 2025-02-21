import { Product } from "./Productos.class.js";


export const getAll = async (req, res) => {
  Product.sync({alter:true});
  try {
    const result = await Product.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "error al obtener los productos" });
  }
};

export const getOne = async (req, res) => {
  Product.sync();
  const id = req.params.id;
  try {
    const result = await Product.findOne({ where: { id: id } });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "error al obtener el producto" });
  }
};

export const add = async (req, res) => {
  Product.sync();
  const { title,description, price, stock, idProv, idCat ,sku} = req.body;
  try {
    const result = await Product.create({
      sku:sku,
      description: description,
      title: title,
      price: price,
      stock: stock,
      idProv: idProv,
      idCat: idCat,
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "error al agregar los productos" });
  }
};

export const update = async (req, res) => {
  Product.sync();
  const { id } = req.params;
  const {title, description, price, stock, idProv, idCat,sku } = req.body;
  try {
    const result = await Product.update(
      {
        sku:sku,
        description: description,
        title: title,
        price: price,
        stock: stock,
        idProv: idProv,
        idCat: idCat,
      },
      { where: { id: id } }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "error al actualizar los productos" });
  }
};

export const remove = async (req, res) => {
  Product.sync();
  const { id } = req.params;
  try {
    const result = await Product.destroy({ where: { id: id } });
    res
      .status(200)
      .send({ message: `producto número ${id} eliminada con exito`, result });
  } catch (error) {
    res.json({ message: "error al eliminar los productos" });
  }
};
