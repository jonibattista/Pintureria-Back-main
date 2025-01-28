import { Row } from "./Renglon/Renglon.class.js";
import { Sale } from "./Ventas.class.js";
import { sequelize } from "../BD.js";
import { Product } from "../Productos/Productos.class.js";


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
    const trans = await sequelize.transaction()
    const { idClient, idEmp, idBranch, total, saleProds} = req.body;
    try {
        const sale = await Sale.create({ idClient: idClient, idEmp: idEmp, idBranch: idBranch, total: total },{ transaction: trans });
        const completeRows = saleProds.map((prod) => {
            prod.idSale = sale.id;
            return prod;
          });
        await Row.bulkCreate(completeRows,{ transaction: trans })
        const datos = saleProds.map((prod) => {
            const total = prod.stock - prod.amount;
            return { id: prod.idProduct, stock: total };
          });
          for (const prod of saleProds) {
            const totalStock = prod.stock - prod.amount;
            await Product.update(
              { stock: totalStock },
              { where: { id: prod.idProduct }, transaction: trans }
            )}
        await trans.commit()
        res.status(201).json({ message: "Venta creada con exito" });
    } catch (error) {
        await trans.rollback()
        res.status(500).json({ message: "Error al crear venta" });
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
