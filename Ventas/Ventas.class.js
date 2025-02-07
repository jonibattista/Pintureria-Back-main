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
            references: {
                model: 'Clients', 
                key: 'id',
            },
        },
        idEmp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Employees', 
                key: 'id', 
            },
        },
        idBranch: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Branches',
                key: 'id',
            },
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        idPay: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
            
        }
    },
    {
        sequelize,
        modelName: "sale",
    },
);

