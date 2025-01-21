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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 3,
    },
  },
  {
    sequelize,
    modelName: "user",
  },
);


