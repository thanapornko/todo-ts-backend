import 'reflect-metadata';
require('dotenv').config();
import { DataSource } from 'typeorm';
import { ToDoList } from './entity/Todolist';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [ToDoList],
  migrations: [],
  subscribers: [],
});
