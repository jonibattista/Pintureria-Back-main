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

export const getByUserId = async (req, res) => {
  Sale.sync()
  const {idUser} = req.params
  try {
      const result = await Sale.findAll({where:{idUser:idUser}});
      res.status(200).json(result);
  } catch (error) {
      res.status(500).json({ message: "Error al obtener las ventas." ,error});
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

export const addSale = async (req, res) => {
  Sale.sync();
  const trans = await sequelize.transaction();
  const { idClient, idEmp, idBranch, total, saleProds, paymentId , idUser} = req.body;
  try {
    if (total === 0) {
      await trans.rollback();
      return res.status(500).json({ message: "La venta debe ser mayor a $1" });
    }
    const sale = await Sale.create(
      {
        idUser: idUser,
        idClient: idClient,
        idEmp: idEmp,
        idBranch: idBranch,
        total: total,
        paymentId: paymentId,
      },
      { transaction: trans }
    );
    const completeRows = saleProds.map((prod) => {
      prod.idSale = sale.id;
      return prod;
    });
    await Row.bulkCreate(completeRows, { transaction: trans });
    for (const prod of saleProds) {
      const totalStock = prod.stock - prod.quantity;
      await Product.update(
        { stock: totalStock },
        { where: { id: prod.idProduct }, transaction: trans }
      );
    }
    await trans.commit();
    res.status(201).json({ message: "Venta creada con exito" });
  } catch (error) {
    await trans.rollback();
    res.status(500).json({ message: "Error al crear venta", error });
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
    const trans = await sequelize.transaction()
    try {
        const rows = await Row.findAll({where:{idSale:id}})
        for (const row of rows) {
            const product = await Product.findOne({ where: { id: row.idProduct } });
            const newStock = product.stock + row.quantity;
            await Product.update(
                { stock: newStock },
                { where: { id: row.idProduct }, transaction: trans }
            );
        }
        await Row.destroy({ where: { idSale: id } }, {transaction:trans});
        await Sale.destroy({ where: { id: id } }, {transaction:trans});
        res
            .status(200)
            .send({ message: `Venta número ${id} eliminada con exito`, result });
        await trans.commit()
    } catch (error) {
        await trans.rollback()
        res.status(500).json(/*{ message: "Error al eliminar las venta." }*/error);;
    }
};
