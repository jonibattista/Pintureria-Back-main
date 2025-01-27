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
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        idProv: {
            type: DataTypes.INTEGER,
            references:{
                model:"Suppliers",
                key: "id"
            },
        },
        idCat: {
            type: DataTypes.INTEGER,
            references:{
                model:"Categories",
                key: "id"
            },
        },
    },
    {
        sequelize,
        modelName: "product",
    },
);
