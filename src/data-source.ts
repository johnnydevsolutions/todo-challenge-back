import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { Task } from './tasks/entities/task.entity';
import { AddNameToUser1743357668552 } from './migrations/1743357668552-AddNameToUser';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [User, Task],
  migrations: [AddNameToUser1743357668552],
  synchronize: false,
  logging: true,
});

export default AppDataSource;
