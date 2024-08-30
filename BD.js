import mysql from 'mysql2/promise';

const config = {
  host: 'localhost',
  port: '3306',
  database: 'pintureria',
  user: 'root',
  password: 'root',
};

export const database = await mysql.createConnection(config);
