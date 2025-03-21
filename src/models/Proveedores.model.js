import { DataTypes, Model } from "sequelize"
import { sequelize } from "../config/BD.js";


export class Supplier extends Model { }

Supplier.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        cuit: {
            type: DataTypes.BIGINT,
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "supplier",
    },
);
