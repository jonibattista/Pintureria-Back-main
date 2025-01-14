import { DataTypes, Model } from "sequelize"
import { sequelize } from "../../BD.js"


export class Category extends Model { }

Category.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        modelName: "category",
    },
);
