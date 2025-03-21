import { Op } from "sequelize";
import { Product } from "../models/Productos.model.js";


export const getAll = async (req, res) => {
  Product.sync();
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

export const getByCat = async (req, res) => {
  Product.sync();
  const idCat = req.params.idCat;
  try {
    const result = await Product.findAll({ where: { idCat: idCat } });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "error al obtener el producto" });
  }
};

export const getByTitle = async (req, res) => {
  Product.sync();
  const title = req.params.title;
  try {
    const result = await Product.findAll({ where: { title: {[Op.like]:title} } });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "error al obtener el producto" });
  }
};

export const add = async (req, res) => {
  Product.sync();
  const { title,description, price, stock, idProv, idCat ,sku, productsArray , imgUrl} = req.body;
  try {
    if(productsArray){
      console.log(productsArray)
      const result= await Product.bulkCreate(productsArray)
      res.status(201).json(result)
    }else {
      const result = await Product.create({
        imgUrl:imgUrl,
        sku:sku,
        description: description,
        title: title,
        price: price,
        stock: stock,
        idProv: idProv,
        idCat: idCat,
      });
      res.status(201).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: "error al agregar los productos" , error});
  }
};

export const update = async (req, res) => {
  Product.sync();
  const { id } = req.params;
  const {title, description, price, stock, idProv, idCat,sku,imgUrl } = req.body;
  try {
    const result = await Product.update(
      {
        imgUrl:imgUrl,
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
