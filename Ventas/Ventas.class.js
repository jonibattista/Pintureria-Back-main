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
                model: 'clients', 
                key: 'id',
            },
        },
        idUser: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'users', 
                key: 'id',
            },
        },
        idEmp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'employees', 
                key: 'id', 
            },
        },
        idBranch: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'branches',
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

