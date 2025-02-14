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
            allowNull: true,
            references: {
                model: 'Clients', 
                key: 'id',
            },
        },
        idUser: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Users', 
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
        paymentId: {
            type: DataTypes.BIGINT,
            allowNull: true,
        }
    },
    {
        sequelize,
        modelName: "sale",
    },
);

