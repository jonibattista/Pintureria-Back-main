import { DataTypes, Model } from "sequelize";
import { sequelize } from "../BD.js";

export class Recover extends Model {}

Recover.init(
  {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps:false,
    sequelize,
    modelName: "recover",
  }
);
