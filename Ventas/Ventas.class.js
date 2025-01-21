import { DataTypes, Model } from "sequelize"
import { sequelize } from "../BD.js"


export class Sale extends Model { }

Sale.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        idClient: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idEmp: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idBranch: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        }
    },
    {
        sequelize,
        modelName: "sale",
    },
);

