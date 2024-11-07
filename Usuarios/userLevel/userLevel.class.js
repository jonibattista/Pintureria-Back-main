import { DataTypes, Model } from "sequelize"
import { sequelize } from "../../BD.js"


export class Level extends Model { }

Level.init(
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
    },
    {
        sequelize,
        modelName: "level",
    },
);
