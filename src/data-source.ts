import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { ToDoList } from './entity/Todolist';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root1234',
  database: 'todolist',
  synchronize: true,
  logging: false,
  entities: [ToDoList],
  migrations: [],
  subscribers: [],
});
