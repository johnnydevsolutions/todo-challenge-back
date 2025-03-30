import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const task = this.tasksRepository.create({
      ...createTaskDto,
      completed: false,
      user,
    });
    return this.tasksRepository.save(task);
  }

  async findAll(user: User, completed?: boolean): Promise<Task[]> {
    const query = this.tasksRepository
      .createQueryBuilder('task')
      .where('task.userId = :userId', { userId: user.id });

    if (completed !== undefined) {
      query.andWhere('task.completed = :completed', { completed });
    }

    return query.getMany();
  }

  async findOne(id: number, user: User): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id, user: { id: user.id } },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
    user: User,
  ): Promise<Task> {
    const task = await this.findOne(id, user);
    Object.assign(task, updateTaskDto);
    return this.tasksRepository.save(task);
  }

  async remove(id: number, user: User): Promise<void> {
    const task = await this.findOne(id, user);
    await this.tasksRepository.remove(task);
  }
}
