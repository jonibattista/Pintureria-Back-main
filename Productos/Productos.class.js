import { DataTypes, Model } from "sequelize"
import { sequelize } from "../BD.js"


export class Product extends Model { }

Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        idProv: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "product",
    },
);


// import { database } from '../BD.js';

// export class Producto {
//   static async findAll() {
//     const [result] = await database.query('SELECT * FROM producto');
//     return result;
//   }
//   static async findOne(id) {
//     const query = 'SELECT * FROM producto WHERE id = ?';
//     const [result] = await database.query(query, id);
//     return result;
//   }

//   static async add(descripcion, precio, stock) {
//     const query =
//       'INSERT INTO producto (descripcion, precio, stock) VALUES (?, ?, ?)';
//     const [result] = await database.query(query, [descripcion, precio, stock]);
//     return result;
//   }

//   static async update(id, desc, precio, stock) {
//     const sql =
//       'UPDATE producto SET descripcion = ?, precio = ?, stock = ? WHERE id = ?';
//     const [result] = await database.query(sql, [desc, precio, stock, id]);
//     return result;
//   }

//   static async delete(id) {
//     const query = 'DELETE FROM producto where id = ?';
//     const [result] = await database.query(query, [id]);
//     return result;
//   }
// }
