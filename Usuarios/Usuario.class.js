import { DataTypes, Model } from "sequelize"
import { sequelize } from "../BD.js"


export class User extends Model { }

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    pswHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 3,
    },
  },
  {
    sequelize,
    modelName: "user",
  },
);



// import { database } from '../BD.js';

// export class Usuario {
//   static async findAll() {
//     const [result] = await database.query('SELECT * FROM usuarios');
//     return result;
//   }

//   static async findOne(id) {
//     const query = 'SELECT * FROM usuarios WHERE id = ?';
//     const [result] = await database.query(query, id);
//     return result;
//   }

//   static async add(username, email, psw) {
//     const query =
//       'INSERT INTO usuarios (username, email, psw) VALUES (?, ?, ?)';
//     const [result] = await database.query(query, [username, email, psw]);
//     return result;
//   }

//   static async update(id, username, email, psw) {
//     const sql =
//       'UPDATE usuarios SET username = ?, email = ?, psw = ? WHERE id = ?';
//     const [result] = await database.query(sql, [username, email, psw, id]);
//     return result;
//   }

//   static async delete(id) {
//     const query = 'DELETE FROM usuarios where id = ?';
//     const [result] = await database.query(query, [id]);
//     return result;
//   }
// }
