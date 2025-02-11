import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("pintureria", process.env.DB_USER, process.env.DB_PSW, {
  host: "localhost",
  dialect: "mysql",
});


try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}