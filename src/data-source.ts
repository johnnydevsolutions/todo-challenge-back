import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { Task } from './tasks/entities/task.entity';
import { AddNameToUser1743357668552 } from './migrations/1743357668552-AddNameToUser';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '@7d93bdc3',
  database: 'todo_db',
  entities: [User, Task],
  migrations: [AddNameToUser1743357668552],
  synchronize: false,
  logging: true,
});

export default AppDataSource;
